var mongoose = require('mongoose');
var Location = mongoose.model('Location');

// MAIN FUNCTIONS
module.exports.locationsCreate = function (req, res) {
    Location.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities,
        rating: req.body.rating,
        distance: req.body.distance,
        workingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }]
    }, function (err, location) {
        if (err) {
            sendResponse(res, 400, err);
        } else {
            sendResponse(res, 201, location);
        }
    });
};

module.exports.locationsRead = function (req, res) {
    Location
        .find()
        .select('-reviews -workingTimes -_id -__v')
        .exec(function (err, location) {
                if (err) {
                    sendResponse(res, 400, err);
                } else {
                    sendResponse(res, 200, location);
                }
            }
        );
};

module.exports.locationsReadOne = function(req, res) {
    Location
        .findById(req.params.locationId)
        .exec(function(err, location) {
            if (!location) {
                sendResponse(res, 404, {
                    'message': 'Location not found'
                });
                return;
            } else if (err) {
                sendResponse(res, 404, err);
                return;
            }
            sendResponse(res, 200, location);
        });
};

module.exports.locationsUpdateOne = function (req, res) {
    if (!req.params.locationId) {
        sendResponse(req, 404, {
            'message': 'Not found, location ID is required'
        });
    }
    Location
        .findById(req.params.locationId)
        .select('-rating -reviews')
        .exec(
            function (err, location) {
                if (!location) {
                    sendResponse(res, 404, {
                        'message': 'Location ID not found'
                    });
                    return;
                } else if (err) {
                    sendResponse(res, 400, err);
                    return;
                }
                location.name = req.body.name;
                location.address = req.body.address;
                location.facilities = req.body.facilities;
                location.rating = req.body.rating;
                location.distance = req.body.distance;
                location.workingTimes = [{
                    days: req.body.days1,
                    opening: req.body.opening1,
                    closing: req.body.closing1,
                    closed: req.body.closed1
                }, {
                    days: req.body.days2,
                    opening: req.body.opening2,
                    closing: req.body.closing2,
                    closed: req.body.closed2
                }];
                location.save(function (err, location) {
                    if (err) {
                        sendResponse(res, 400, err);
                    } else {
                        sendResponse(res, 200, location);
                    }
                });
            }
        );
};

module.exports.locationsDeleteOne = function (req, res) {
    var locationId = req.params.locationId;
    if (locationId) {
        Location
            .findByIdAndRemove(locationId)
            .exec(function (err) {
                if (err) {
                    sendResponse(res, 400, err);
                    return;
                }
                sendResponse(res, 204, null);
            });
    } else {
        sendResponse(res, 404, null);
    }
};

// ADDITIONAL FUNCTION
var sendResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
