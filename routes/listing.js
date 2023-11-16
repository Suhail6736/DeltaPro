const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/expressError.js")
const {reviewSchema} = require("../schema.js")
const Listing = require("../models/listing.js");
const {isLoggedIn,inOwner} = require("../middlewar.js")
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudconfig.js")
const upload = multer({ storage })
// const reviews = require("../routes/review.js")



// Index route
router.get("/", wrapAsync( listingController.index));
  
  // New route
  router.get("/new", isLoggedIn, listingController.rendernewform)
    
  // Show route get request
  router.get("/:id",  wrapAsync(listingController.showListing));

  // show route post request
  router.post("/", upload.single('listing[image]'),wrapAsync(listingController.createListing));
  

  //edit route
  router.get("/:id/edit", isLoggedIn,inOwner, wrapAsync(listingController.editform));
  
  
  //edit route put request // update route
  router.put("/:id", isLoggedIn, inOwner,upload.single('listing[image]'), wrapAsync(listingController.updatelisting))
  
  
  //delete route
  router.delete("/:id", isLoggedIn, inOwner, wrapAsync(listingController.deleteListing));
  


  module.exports = router;