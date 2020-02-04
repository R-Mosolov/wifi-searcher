var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

// Locations pages
router.get('/', ctrlOthers.angularApp);
router.get('/location/:path', ctrlLocations.locationInfo);
router.get('/location/:path/review/new', ctrlLocations.addReview);
router.post('/location/:path/review/new', ctrlLocations.sendReview);

// Other pages
router.get('/about', ctrlOthers.about);

module.exports = router;
