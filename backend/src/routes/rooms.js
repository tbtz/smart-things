const express = require('express');
const router = express.Router();
const File = require('../models/file');

const path = require('path');

let ROOMS_FILE_PATH;
if (process.env.NODE_ENV === 'production') {
    ROOMS_FILE_PATH = path.join(__dirname, 'data/home.json');
} else {
    ROOMS_FILE_PATH = path.join(__dirname, './../../../data/home.json');
}

router.get('/', (req, res) => {
    File.readJson(ROOMS_FILE_PATH)
        .then(devices => {
            res.send(devices);
        })
        .catch(e => {
            console.error(e);
            res.status(500).send(e);
        });
});

router.get('/:roomId', (req, res) => {
    let roomId = req.params.roomId;
    File.readJson(ROOMS_FILE_PATH)
        .then(rooms => {
            if (!rooms.hasOwnProperty(roomId)) {
                throw new Error('Room not found');
            }
            res.send(rooms[roomId]);
        })
        .catch(e => {
            console.error(e);
            res.status(500).send(e);
        });

});

router.put('/:roomId', (req, res) => {
    let newRooms = {};
    File.readJson(ROOMS_FILE_PATH)
        .then(rooms => {
            newRooms = rooms;

            const roomId = req.params.roomId;
            if (newRooms.hasOwnProperty(roomId)) {
                throw new Error('Room already exists');
            }

            let roomConfig = req.body;
            if (!roomConfig.hasOwnProperty.devices) roomConfig.devices = {};

            newRooms[roomId] = roomConfig;
            return File.writeJson(ROOMS_FILE_PATH, newRooms);
        })
        .then(() => {
            res.send(newRooms);
        })
        .catch(e => {
            console.error(e);
            res.status(500).send(e);
        });
});

router.post('/:roomId', (req, res) => {
    let newRooms = {};
    File.readJson(ROOMS_FILE_PATH)
        .then(rooms => {
            newRooms = rooms;

            const roomId = req.params.roomId;
            if (!newRooms.hasOwnProperty(roomId)) {
                throw new Error('Room not found');
            }

            let newRoomConfig = req.body;

            if (!newRoomConfig.hasOwnProperty("devices")) newRoomConfig.devices = {};

            newRooms[roomId] = newRoomConfig;
            return File.writeJson(ROOMS_FILE_PATH, newRooms);
        })
        .then(() => {
            res.send(newRooms);
        })
        .catch(e => {
            console.error(e);
            res.status(500).send(e);
        });
});

router.delete('/:roomId', (req, res) => {
    let newRooms = {};
    File.readJson(ROOMS_FILE_PATH)
        .then(rooms => {
            newRooms = rooms;

            const roomId = req.params.roomId;
            
            if (!newRooms.hasOwnProperty(roomId)) {
                throw new Error('Room not found');
            }

            delete newRooms[roomId];
            return File.writeJson(ROOMS_FILE_PATH, newRooms);
        })
        .then(() => {
            res.send(newRooms);
        })
        .catch(e => {
            console.error(e);
            res.status(500).send(e);
        });

});

module.exports = router;