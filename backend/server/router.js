const express = require('express');
const router = express.Router();

const authController = require('./controllers/auth');
const polygonsController = require('./controllers/polygons');

router.post('/login', authController.login);
router.get('/polygons', polygonsController.getPolygons);


module.exports = router;
