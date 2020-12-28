
const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
    constructor(params) {

        const userDataPath = (electron.app || electron.remote.app).getPath('userData');

        // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
        this.path = path.join(userDataPath, params.fileName + '.json');

        this.data = parseDataFile(this.path, params.defaults);
    }

    // This will just return the property on the `data` object
    get(key) {
        return this.data[key];
    }

    // ...and this will set it
    set(key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
}

function parseDataFile(filePath, defaults) {

    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {

        return defaults;
    }
}

// expose the class
module.exports = Store;