import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getUserModelById } from './idb.js';

let scene, camera, renderer, controls, modelGroup;
const loader = new GLTFLoader();

init();

async function init() {
    const container = document.getElementById('canvas-container');
    const urlParams = new URLSearchParams(window.location.search);
    const modelName = urlParams.get('name') || '3D Модель';
    document.getElementById('modelTitle').innerText = modelName;

    scene = new THREE.Scene();
    scene.background = new THREE.Color('#e2e8f0');

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, 6);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2; 

    const gridHelper = new THREE.GridHelper(20, 20, 0x475569, 0xcbd5e1);
    scene.add(gridHelper);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const type = urlParams.get('type');
    if (type === 'static') {
        const paths = JSON.parse(decodeURIComponent(urlParams.get('paths')));
        const promises = paths.map((path, idx) => loadModel(path, idx));
        await Promise.all(promises);
    } else {
        const id = parseInt(urlParams.get('id'));
        const userModel = await getUserModelById(id);
        if (userModel) {
            const blobUrl = URL.createObjectURL(userModel.blob);
            await loadModel(blobUrl, 0);
        }
    }

    setupControls();
    animate();
}

function loadModel(url, offsetIndex) {
    return new Promise((resolve) => {
        loader.load(url, (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());

            model.position.y = -box.min.y; // Выравниваем основание по сетке пола (y=0)
            model.position.x = -center.x + (offsetIndex * 1.5);
            model.position.z = -center.z;

            modelGroup.add(model);
            resolve();
        }, undefined, () => resolve());
    });
}

function setupControls() {
    document.getElementById('zoomIn').addEventListener('click', () => {
        camera.position.z -= 0.8;
    });
    document.getElementById('zoomOut').addEventListener('click', () => {
        camera.position.z += 0.8;
    });

    document.querySelectorAll('.btn-grid button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.getAttribute('data-view');
            const radius = camera.position.distanceTo(controls.target);
            
            switch(view) {
                case 'front':  camera.position.set(0, 1.5, radius); break;
                case 'back':   camera.position.set(0, 1.5, -radius); break;
                case 'left':   camera.position.set(-radius, 1.5, 0); break;
                case 'right':  camera.position.set(radius, 1.5, 0); break;
            }
            controls.update();
        });
    });

    window.addEventListener('resize', () => {
        const container = document.getElementById('canvas-container');
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}