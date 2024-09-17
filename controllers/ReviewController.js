const Review =require("../models/Review");

const findAll = async(res)=>{
    let allReviews= await Review.find({});
    return res.json(allReviews);
}

exports.getAll = (req,res)=>{
    findAll(res);
}

exports.getReviewById = async(req,res)=>{
   let review = await Review.findOne({resId: req.params.id});
   res.json(review);
}

exports.addReview = (req,res)=>{
const {resId, user, rating, description} = req.body;
let newReview = new Review({
    resId,
    user,
    rating,
    description,
    date: new Date()
})
newReview.save().then((rest)=>{
    res.send("review added");
})
}