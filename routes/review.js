const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/expressError.js")
const {reviewSchema} = require("../schema.js")

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");    
const { isLoggedIn,isAuthor } = require("../middlewar.js");
const reviewController = require("../controllers/reviews.js")

//reviews route
router.post("/", isLoggedIn, wrapAsync(reviewController.createReview));
   
//reviews Delete route
router.delete("/:reviewid", isLoggedIn, isAuthor,wrapAsync(reviewController.destroyReview));

   module.exports = router;