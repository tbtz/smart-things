const PORT = process.env.PORT || 3000
const path = require('path');

const express = require('express');

const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression');

const routes = require('./routes');

var app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(compression());

app.use('/api', routes);

var FRONTEND_DIR;
if (process.env.NODE_ENV === 'production') {
    FRONTEND_DIR = path.join(__dirname, 'webapp');
} else {
    FRONTEND_DIR = path.join(__dirname, '../../frontend/dist');
}


app.use(express.static(FRONTEND_DIR));

app.get('*', (req, res) => {
    res.sendFile(path.join(FRONTEND_DIR, './index.html'));
});


// CHECK IF CONFIG EXISTS
let ROOMS_FILE_PATH;
if (process.env.NODE_ENV === 'production') {
    ROOMS_FILE_PATH = path.join(__dirname, 'data/home.json');
} else {
    ROOMS_FILE_PATH = path.join(__dirname, './../../../data/home.json');
}
var fs = require('fs');
if (!fs.existsSync(ROOMS_FILE_PATH)) {
    fs.mkdirSync(path.dirname(ROOMS_FILE_PATH));
    fs.writeFileSync(ROOMS_FILE_PATH, "{}");
}


app.listen(PORT, function () {
    console.log(require('./banner'));
    console.log(`App is running on port ${PORT}!`);
});