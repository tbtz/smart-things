var fs = require('fs');

function readJson(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err, text) {
            if (err) reject(err);
            try {
                let object = JSON.parse(text);
                resolve(object);
            } catch (e) {
                reject(e);
            }
        });
    })
}

function writeJson(filePath, object) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(object, null, 2), function (err) {
            if (err) reject(err);
            resolve();
        });
    })
}

module.exports = {
    readJson,
    writeJson
}