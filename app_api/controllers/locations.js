var mongoose = require('mongoose');
var Location = mongoose.model('Location');

// FINISHED MAIN FUNCTIONS
module.exports.locationsCreate = function (req, res) {
    sendResponse(res, 200, {
        'status': 'success'
    });
};
module.exports.locationsRead = function (req, res) {
    Location
        .find()
        .exec(function(err, locations) {
            sendResponse(res, 200, locations);
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
