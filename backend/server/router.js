const express = require('express');
const router = express.Router();

const authController = require('./controllers/auth');
const polygonsController = require('./controllers/polygons');
const pointsController = require('./controllers/points');

router.post('/login', authController.login);

router.get('/polygons', polygonsController.getPolygons);

router.get('/points', pointsController.getPoints);


module.exports = router;
