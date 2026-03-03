const express=require("express");
const router = express.Router({ mergeParams: true });
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const reviewController = require("../controllers/review.js");
// reviews post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//review delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
module.exports = router;