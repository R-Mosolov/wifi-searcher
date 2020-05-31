var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function (password) {
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    this.salt = crypto.randomBytes(16).toString('hex');
};

userSchema.methods.validPassword = function (password) {
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        id: this._id,
        email: this.email,
        name: this.name,
        expiry: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
};
