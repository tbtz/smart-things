const express = require('express')
const router = express.Router()

router.use('/rooms', require('./rooms'));
router.use('/rooms/:roomId/devices', require('./devices'));

module.exports = router;