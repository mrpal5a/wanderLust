const express = require("express");
const router = express.Router({mergeParams:true}); // we are setting mergeParams as true so that child will get starting URL from parent
const { reviewSchema } = require("../schema.js"); // requiring the server side schema for new listing validation and we will make one function of this and pass that function as middleware before listing

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Post Review Route
router.post(
    "/",     
    isLoggedIn,                      
    validateReview,
    wrapAsync(reviewController.postReview)
  );
  
  //Review Delete route
  router.delete(
    "/:reviewId", // replacing the common URL "/listings/:id/reviews" with "/"
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview)
  );
  
  module.exports = router; // don't forget to export this