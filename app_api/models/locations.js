var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    reviewNumber: {
        type: Number,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: false,
        'default': Date.now
    },
    reviewText: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 50
    },
});

var workingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: false
    },
    opening: {
        type: String,
        required: false
    },
    closing: {
        type: String,
        required: false
    },
    closed: {
        type: Boolean,
        required: false
    }
});

var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    facilities: {
        type: [String],
        required: false
    },
    rating: {
        type: Number,
        required: false,
        'default': 0,
        min: 0,
        max: 5
    },
    distance: {
        type: Number,
        required: false
    },
    workingTimes: [workingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);
