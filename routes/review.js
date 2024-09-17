const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController")

router.get('/all', reviewController.getAll);
router.get('/get/:id',reviewController.getReviewById);
router.post('/add', reviewController.addReview);

module.exports = router;