const express = require("express");
const router = express.Router();

const listingController = require("../controllers/listings.js");

router.route("/")
    .get(listingController.index)
    .post(listingController.createListing);

router.route("/new")
    .get(listingController.renderNewForm);

router.route("/:id")
    .get(listingController.showListing)
    .put(listingController.updateListing);

router.route("/:id/edit")
    .get(listingController.renderEditForm)
    
    
    
module.exports=router;
