import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { saveModel, getAllUserModels } from './idb.js';

const STATIC_MODELS = [
    { name: 'Машина', type: 'static', paths: ['models/car.glb'] },
    { name: 'Дерево 1', type: 'static', paths: ['models/tree1.glb'] },
    { name: 'Дерево 2', type: 'static', paths: ['models/tree2.glb'] },
    { name: 'Машина + Дерево', type: 'static', paths: ['models/car.glb', 'models/tree.glb'] } // Парная карточка!
];

const loader = new GLTFLoader();

document.addEventListener('DOMContentLoaded', async () => {
    await renderGallery();
    setupUpload();
});

async function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '';

    const userModels = await getAllUserModels();
    const allModels = [...STATIC_MODELS, ...userModels.map(m => ({ id: m.id, name: m.name, type: 'user', blob: m.blob }))];

    allModels.forEach(modelData => {
        const card = document.createElement('div');
        card.className = 'model-card';
        
        const previewContainer = document.createElement('div');
        previewContainer.className = 'preview-container';
        
        const title = document.createElement('h3');
        title.innerText = modelData.name;

        card.appendChild(previewContainer);
        card.appendChild(title);
        grid.appendChild(card);

        card.addEventListener('click', () => {
            if (modelData.type === 'static') {
                window.location.href = `detail.html?type=static&paths=${encodeURIComponent(JSON.stringify(modelData.paths))}&name=${encodeURIComponent(modelData.name)}`;
            } else {
                window.location.href = `detail.html?type=user&id=${modelData.id}&name=${encodeURIComponent(modelData.name)}`;
            }
        });

        initMiniPreview(previewContainer, modelData);
    });
}

function initMiniPreview(container, modelData) {
    const width = container.clientWidth || 200;
    const height = 150;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f1f5f9');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2, 2, 4);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const group = new THREE.Group();
    scene.add(group);

    const loadModelIntoGroup = (urlOrBlob, offsetIndex = 0) => {
        return new Promise((resolve) => {
            const successCallback = (gltf) => {
                const model = gltf.scene;
                
                // Рассчитываем габариты для центрирования
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());

                model.position.y = -box.min.y;
                model.position.x = -center.x + (offsetIndex * 1.2);
                model.position.z = -center.z;

                group.add(model);
                resolve();
            };

            if (urlOrBlob instanceof Blob) {
                const url = URL.createObjectURL(urlOrBlob);
                loader.load(url, successCallback, undefined, () => resolve());
            } else {
                loader.load(urlOrBlob, successCallback, undefined, () => {
                    container.innerHTML = '<div class="puzzle-icon">🧩</div>';
                    resolve();
                });
            }
        });
    };

    const triggerSingleRender = () => {
        group.rotation.y = Math.PI / 4;
        renderer.render(scene, camera);
        renderer.dispose();
    };

    if (modelData.type === 'static') {
        const promises = modelData.paths.map((path, idx) => loadModelIntoGroup(path, idx));
        Promise.all(promises).then(triggerSingleRender);
    } else {
        loadModelIntoGroup(modelData.blob).then(triggerSingleRender);
    }
}

function setupUpload() {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.glb')) {
            await saveModel(file.name.replace('.glb', ''), file);
            alert('Модель успешно сохранена в IndexedDB!');
            renderGallery();
        }
    });
}