var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');

// LOCATIONS ROUTERS
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations', ctrlLocations.locationsRead);
router.get('/locations/:path', ctrlLocations.locationsReadOne);
router.put('/locations/:path', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:path', ctrlLocations.locationsDeleteOne);

// REVIEWS ROUTERS
router.post('/locations/:path/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:path/reviews/:reviewId', ctrlReviews.reviewsReadOne);
router.put('/locations/:path/reviews/:reviewId', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:path/reviews/:reviewId', ctrlReviews.reviewsDeleteOne);

// AUTHENTICATION ROUTERS
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
