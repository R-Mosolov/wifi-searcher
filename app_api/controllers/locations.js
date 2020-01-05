var mongoose = require('mongoose');
var Location = mongoose.model('Location');

var sendResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsCreate = function (req, res) {
    sendResponse(res, 200, {
        'status': 'success'
    });
};

module.exports.locationsReadOne = function(req, res) {
    Location
        .findById(req.params.locationid)
        .exec(function(err, location) {
            sendResponse(res, 200, location);
        });
};

module.exports.locationsListByDistance = function (req, res) {
    Location
        .find()
        .exec(function(err, locations) {
            sendResponse(res, 200, locations);
        });
};

module.exports.locationsUpdateOne = function (req, res) {};
module.exports.locationsDeleteOne = function (req, res) {};
