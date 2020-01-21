var mongoose = require('mongoose');
var Location = mongoose.model('Location');

// MAIN FUNCTIONS
module.exports.reviewsCreate = function (req, res) {
    var path = req.params.path;
    if (path) {
        Location
            .findOne({
                path: path
            })
            .select('reviews')
            .exec(
                function (err, location) {
                    if (err) {
                        sendResponse(res, 400, err);
                    } else {
                        addReview(req, res, location);
                    }
                }
            );
    } else {
        sendResponse(res, 404, {
            'message': 'Not found, path required'
        });
    }
};

module.exports.reviewsReadOne = function (req, res) {
    if (req.params && req.params.path && req.params.reviewId) {
        Location
            .findOne({
                path: req.params.path
            })
            .select('name reviews')
            .exec(function (err, location) {
                var response, review;
                if (!location) {
                    sendResponse(res, 404, {
                        'message': 'Path not found'
                    });
                } else if (err) {
                    sendResponse(res, 400, err);
                }
                if (location.reviews && location.reviews.length > 0) {
                    review = location.reviews.id(req.params.reviewId);
                    if (!review) {
                        sendResponse(res, 404, {
                            'message': 'Review ID not found'
                        });
                    } else {
                        response = {
                            location: {
                                name: location.name,
                                _id: req.params.path
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
                'message': 'Object not found, path and review ID are required'
            });
        }
};

module.exports.reviewsUpdateOne = function (req, res) {
    if (!req.params.path || !res.params.reviewId) {
        sendResponse(res, 404, {
            'message': 'Not found, path and review ID are required'
        });
        return;
    }
    Location
        .findOne({
            path: req.params.path
        })
        .select('reviews')
        .exec(
            function (err, location) {
                if (!location) {
                    sendResponse(res, 404, {
                        'message': 'Path not found'
                    });
                    return;
                } else if (err) {
                    sendResponse(res, 400, err);
                    return;
                }
                if (location.reviews && location.reviews.length > 0) {
                    currentReview = location.reviews.id(req.params.id);
                    if (!currentReview) {
                        sendResponse(res, 404, {
                            'message': 'Review ID not found'
                        });
                    } else {
                        currentReview.author = req.params.author;
                        currentReview.rating = req.params.rating;
                        currentReview.review = req.params.review;
                    }
                    location.save(function (err, location) {
                        if (err) {
                            sendResponse(res, 400, err);
                        } else {
                            updateAverageRating(location._id);
                            sendResponse(res, 200, currentReview);
                        }
                    });
                } else {
                    sendResponse(res, 404, {
                        'message': 'No review to update'
                    });
                }
            }
        );
};

module.exports.reviewsDeleteOne = function (req, res) {
    if (!req.params.path || !req.params.reviewId) {
        sendResponse(res, 404, {
            'message': 'Not found, path and review ID are required'
        });
        return;
    } else if (err) {
        sendResponse(res, 400, err);
        return;
    }
    Location
        .findOne({
            path: req.params.path
        })
        .select('reviews')
        .exec(
            function (err, location) {
                if (!location) {
                    sendResponse(res, 404, {
                        'message': 'Path not found'
                    });
                    return;
                } else if (err) {
                    sendResponse(res, 400, err);
                    return;
                }
                if (location.reviews && location.reviews.length > 0) {
                    if (!location.reviews.id(req.params.reviewId)) {
                        sendResponse(res, 404, {
                            'message': 'Review ID not found'
                        });
                    } else {
                        location.reviews.id(req.params.reviewId).remove();
                        location.save(function (err, location) {
                            if (err) {
                                sendResponse(res, 400, err);
                            } else {
                                // updateAverageRating(location._id);
                                sendResponse(res, 204, null);
                            }
                        });
                    }
                } else {
                    sendResponse(res, 404, {
                        'message': 'No reviews to delete'
                    });
                }
        });
};

// ADDITIONAL FUNCTIONS
var sendResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var addReview = function (req, res, location) {
    if (!location) {
        sendResponse(res, 404, {
            'message': 'Path not found'
        });
    } else {
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText,
            date: req.body.date
        });
        location.save(function (err, location) {
            var currentReview;
            if (err) {
                sendResponse(res, 400, err);
            } else {
                // updateAverageRating(location._id);
                currentReview = location.reviews[location.reviews.length - 1];
                sendResponse(res, 201, currentReview);
            }
        });
    }
};

// var updateAverageRating = function (req) {
//     Location
//         .findOne({
//             path: req.params.path
//         })
//         .select('rating reviews')
//         .exec(
//             function (err, location) {
//                 if (!err) {
//                     calculateAverageRating(location);
//                 }
//             }
//         );
// };
//
// var calculateAverageRating = function (location) {
//     var i, reviewCount, ratingAverage, ratingTotal;
//     if (location.reviews && location.reviews.length > 0) {
//         reviewCount = location.reviews.length;
//         ratingTotal = 0;
//         for (i = 0; i < reviewCount; i++) {
//             ratingTotal += location.reviews[i].rating;
//         }
//         ratingAverage = parseInt(ratingTotal / reviewCount, 10);
//         location.rating = ratingAverage;
//         location.save(function (err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('Average rating updated to ' + ratingAverage);
//             }
//         });
//     }
// };
