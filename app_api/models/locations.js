var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    reviewNumber: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        'default': Date.now
    },
    reviewText: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
});

var workingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: {
        type: String,
        required: true
    },
    closing: {
        type: String,
        required: true
    },
    closed: {
        type: Boolean,
        required: true
    }
});

var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    facilities: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        required: true,
        'default': 0,
        min: 0,
        max: 5
    },
    distance: {
        type: Number,
        required: true
    },
    workingTimes: [workingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);
