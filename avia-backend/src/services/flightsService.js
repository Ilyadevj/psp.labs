const fileService = require('./fileService');
let path;
module.exports = {
    init: (p) => path = p,
    findAll: () => fileService.readData(path),
    findOne: (id) => fileService.readData(path).find(f => f.id === id),
    update: (id, data) => {
        let f = fileService.readData(path);
        let idx = f.findIndex(x => x.id === id);
        if (idx === -1) return null;
        f[idx] = { ...f[idx], ...data };
        fileService.writeData(path, f);
        return f[idx];
    }
};