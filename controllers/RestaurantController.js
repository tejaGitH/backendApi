const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

const findAll = async(res)=>{
    let allRestaurants = await Restaurant.find({});
    return res.json(allRestaurants);
}

exports.getAll=(req,res)=>{
    findAll(res);
}

exports.getRestaurant= async(req,res)=>{
    let restaurantToGet = await Restaurant.find(req.params.id);
        res.json(restaurantToGet);
}
exports.addRestaurant=(req,res)=>{
    let restaurantToAdd = new Restaurant({name : req.body.name});
    restaurantToAdd.save().then((err,rest)=>{
        res.send("Restaurant added").json(rest);
    })
}