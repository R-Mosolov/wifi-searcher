var mongoose = require('mongoose');
var Location = mongoose.model('Location');

var sendResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsCreate = function (req, res) {
    sendResponse(res, 200, {'status': 'success'});
};

module.exports.locationsListByDistance = function (req, res) {};
module.exports.locationsReadOne = function (req, res) {};
module.exports.locationsUpdateOne = function (req, res) {};
module.exports.locationsDeleteOne = function (req, res) {};