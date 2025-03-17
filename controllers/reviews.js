const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.postReview = async (req, res) => {
      let listing = await Listing.findById(req.params.id);
      let newReview = new Review(req.body.review); // passing the object that we had created in review form
      newReview.author = req.user._id;
      await listing.reviews.push(newReview); // har listing ke pass khud ka array hai schema ke andar reviews name se to us mai push kare rahe hai information ko 
      await newReview.save();
      await listing.save();
      req.flash("success", "New Review Created");
      res.redirect(`/listings/${req.params.id}`);
    }
module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}}); // yeh pull operator reviews array mai se reviewId ka data remove kr dega
    let review = await Review.findByIdAndDelete(`${reviewId}`);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
  }