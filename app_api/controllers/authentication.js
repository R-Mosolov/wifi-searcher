var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponce = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJsonResponce(res, 400, {
            "message": "All fields required."
        })
    }

    var User = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        if (err) {
            sendJsonResponce(req, 404, err);
        } else {
            token = user.generateJwt();
            sendJsonResponce(req, 200, {
                "token": token
            });
        }
    });
};

module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        return sendJsonResponce(res, 400, {
            "message": "All fields required."
        });
    }

    passport.authenticate('local', function (err, user, info) {
        var token;

        if (err) {
            return sendJsonResponce(res, 404, err);
        }

        if (user) {
            token = user.generateJwt();
            sendJsonResponce(res, 200, {
                "token": token
            })
        } else {
            sendJsonResponce(res, 401, info);
        }
    })(req, req);
};
