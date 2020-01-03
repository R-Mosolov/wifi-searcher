var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

// locations
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:id', ctrlLocations.locationsReadOne);
router.put('/locations/:id', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:id', ctrlLocations.locationsDeleteOne);

// reviews
router.post('/locations/:id/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:id/reviews/:id', ctrlReviews.reviewsReadOne);
router.put('/locations/:id/reviews/:id', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:id/reviews/:id', ctrlReviews.reviewsDeleteOne);

module.exports = router;
