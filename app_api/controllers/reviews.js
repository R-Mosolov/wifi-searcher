var mongoose = require('mongoose');
var Review = mongoose.model('Location');

var sendResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsCreate = function (req, res) {
    sendResponse(res, 200, {
        'status': 'success'
    });
};

module.exports.reviewsReadOne = function (req, res) {};
module.exports.reviewsRead = function (req, res) {};
module.exports.reviewsUpdateOne = function (req, res) {};
module.exports.reviewsDeleteOne = function (req, res) {};
