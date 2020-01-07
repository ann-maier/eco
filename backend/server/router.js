const express = require('express');
const router = express.Router();

const authController = require('./controllers/auth');
const polygonsController = require('./controllers/polygons');
const pointsController = require('./controllers/points');
const pointController = require('./controllers/point');
const typeOfObjectController = require('./controllers/typeofobject');

router.post('/login', authController.login);

router.get('/polygons', polygonsController.getPolygons);
router.post('/polygon', polygonsController.addPolygon);

router.get('/points', pointsController.getPoints);

router.post('/point', pointController.addPoint);

router.post('/point', pointController.addPoint);

router.get('/typeofobjects', typeOfObjectController.getTypes);

module.exports = router;
