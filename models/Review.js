const mongoose = require("mongoose");
 const reviewSchema = new mongoose.Schema({
    resId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },  
    rating: {
        type: Number,
        minimum: 1,
        maximum: 5,
        required: true
    }, 
    date: {
        type: Date,
        required: true
    }
});

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;