 const express = require("express");
 const router = express.Router();
 const restaurantController = require("../controllers/RestaurantController");

router.post('/add',restaurantController.addRestaurant);
router.get('/all',restaurantController.getAll);
router.get('/get/:id',restaurantController.getRestaurant);
module.exports = router;