var mongoose = require('mongoose');

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
    }
});
