var mongoose = require('mongoose');
var Location = mongoose.model('Location');

var radianCalculator = function () {
    var EARTH_RADIUS = 6371;
    var getDistanceFromRads = function (rads) {
        return parseFloat(rads * EARTH_RADIUS);
    };
    var getRadsFromDistance = function (distance) {
        return parseFloat(distance / EARTH_RADIUS);
    };
    return {
        getDistanceFromRads: getDistanceFromRads,
        getRadsFromDistance: getRadsFromDistance
    }
};

// FINISHED MAIN FUNCTIONS
module.exports.locationsCreate = function (req, res) {
    sendResponse(res, 200, {
        'status': 'success'
    });
};

module.exports.locationsListByDistance = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var point = {
        type: 'Point',
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: radianCalculator().getRadsFromDistance(20),
        num: 10
    };
    Location.geoSearch(point, geoOptions, function (err, results, stats) {
        var locations = [];
        results.forEach(function (doc) {
            locations.push({
                distance: radianCalculator().getDistanceFromRads(doc.dis),
                name: doc.obj.name,
                address: doc.obj.address,
                rating: doc.obj.rating,
                facilities: doc.obj.facilities,
                _id: doc.obj._id
            });
            sendResponse(res, 200, locations);
        })
    });
};

module.exports.locationsReadOne = function(req, res) {
    Location
        .findById(req.params.locationId)
        .exec(function(err, location) {
            if (!location) {
                sendResponse(res, 404, {
                    'message': 'Object not found'
                });
                return;
            } else if (err) {
                sendResponse(res, 404, err);
                return;
            }
            sendResponse(res, 200, location);
        });
};

// NOT FINISHED MAIN FUNCTIONS
module.exports.locationsUpdateOne = function (req, res) {};
module.exports.locationsDeleteOne = function (req, res) {};

// ADDITIONAL FUNCTION
var sendResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
