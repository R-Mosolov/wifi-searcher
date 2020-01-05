var mongoose = require('mongoose');
var Location = mongoose.model('Location');

// FINISHED MAIN FUNCTIONS
module.exports.reviewsCreate = function (req, res) {
    sendResponse(res, 200, {
        'status': 'success'
    });
};
module.exports.reviewsReadOne = function (req, res) {
    if (req.params && req.params.locationId && req.params.reviewId) {
        Location
            .findById(req.params.locationId)
            .select('name reviews')
            .exec(function (err, location) {
                var response, review;
                if (!location) {
                    sendResponse(res, 404, {
                        'message': 'LocationId not found'
                    });
                } else if (err) {
                    sendResponse(res, 400, err);
                }

                if (location.reviews && location.reviews.length > 0) {
                    review = location.reviews.id(req.params.reviewId);
                    if (!review) {
                        sendResponse(res, 404, {
                            'message': 'ReviewId not found'
                        });
                    } else {
                        response = {
                            location: {
                                name: location.name,
                                id: req.params.locationId
                            },
                            review: review
                        };
                        sendResponse(res, 200, response);
                    }

                    sendResponse(res, 404, {
                        'message': 'No reviews found'
                    });
                }
            });
        } else {
            sendResponse(res, 404, {
                'message': 'Object not found, locationId and reviewId are required'
            });
        }
};

// NOT FINISHED MAIN FUNCTIONS
module.exports.reviewsRead = function (req, res) {};
module.exports.reviewsUpdateOne = function (req, res) {};
module.exports.reviewsDeleteOne = function (req, res) {};

// ADDITIONAL FUNCTION
var sendResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
