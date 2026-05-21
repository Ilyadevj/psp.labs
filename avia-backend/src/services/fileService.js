const fs = require('fs');
module.exports = {
    readData: (path) => JSON.parse(fs.readFileSync(path, 'utf8')),
    writeData: (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2))
};