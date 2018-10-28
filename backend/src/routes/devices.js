const express = require('express');
const router = express.Router({ mergeParams: true });
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
        .then(rooms => {
            const roomId = req.params.roomId;
            if (!rooms.hasOwnProperty(roomId)) {
                throw new Error('Room not found');
            }

            let room = rooms[roomId];
            res.send(room.devices);
        })
        .catch(e => {
            console.error(e);
            res.status(500).send(e);
        });
});

router.get('/:deviceId', (req, res) => {
    File.readJson(ROOMS_FILE_PATH)
        .then(rooms => {
            const roomId = req.params.roomId;
            if (!rooms.hasOwnProperty(roomId)) {
                throw new Error('Room not found');
            }
            let room = rooms[roomId];

            const deviceId = req.params.deviceId;
            if (!room.devices.hasOwnProperty(deviceId)) {
                throw new Error('Device not found');
            }

            let device = room.devices[deviceId];

            res.send(device);
        })
        .catch(e => {
            console.error(e);
            res.status(500).send(e);
        });
});

router.put('/:deviceId', (req, res) => {
    let newRooms = {};
    File.readJson(ROOMS_FILE_PATH)
        .then(rooms => {
            newRooms = rooms;

            const roomId = req.params.roomId;
            if (!newRooms.hasOwnProperty(roomId)) {
                throw new Error('Room not found');
            }
            let room = newRooms[roomId];

            const deviceId = req.params.deviceId;
            if (room.devices.hasOwnProperty(deviceId)) {
                throw new Error('Device already exists');
            }

            let deviceConfig = req.body;
            room.devices[deviceId] = deviceConfig;
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

router.post('/:deviceId', (req, res) => {
    let newRooms = {};
    File.readJson(ROOMS_FILE_PATH)
        .then(rooms => {
            newRooms = rooms;

            const roomId = req.params.roomId;
            if (!newRooms.hasOwnProperty(roomId)) {
                throw new Error('Room not found');
            }
            let room = newRooms[roomId];

            const deviceId = req.params.deviceId;
            if (!room.devices.hasOwnProperty(deviceId)) {
                throw new Error('Device not found');
            }

            let deviceConfig = req.body;
            room.devices[deviceId] = deviceConfig;
            return File.writeJson(ROOMS_FILE_PATH, newRooms);
        })
        .then(() => {
            res.send(newRooms);
        })
        .catch(e => {
            console.error(e.message);
            res.status(500).send(e);
        })
});

router.delete('/:deviceId', (req, res) => {
    let newRooms = {};
    File.readJson(ROOMS_FILE_PATH)
        .then(rooms => {
            newRooms = rooms;

            const roomId = req.params.roomId;
            if (!newRooms.hasOwnProperty(roomId)) {
                throw new Error('Room not found');
            }
            let room = newRooms[roomId];

            const deviceId = req.params.deviceId;
            if (!room.devices.hasOwnProperty(deviceId)) {
                throw new Error('Device not found');
            }
            
            delete room.devices[deviceId]
            return File.writeJson(ROOMS_FILE_PATH, newRooms);
        })
        .then(() => {
            res.send(newRooms);
        })
        .catch(e => {
            console.error(e.message);
            res.status(500).send(e);
        })
});

module.exports = router;