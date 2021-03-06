var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/wifi-searcher';

if (process.env.NODE_ENV === 'production') {
    dbURI = `${process.env.MONGODB_URI}`;
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

// DISCONNECTION EVENTS
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    })
});
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    })
});

// DISCONNECTION MESSAGE GENERATOR
var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through: ' + msg);
        callback();
    })
};

require('./locations');
require('./users');
