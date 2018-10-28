const PORT = process.env.PORT || 3000;
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

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(PORT, function () {
    console.log(require('./banner'));
    console.log(`App is running on port ${PORT}!`);
});