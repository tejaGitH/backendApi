const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: "Mumbai"
    },
    cuisine: {
        type: String,
        default: "foodwala"
    }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;