const express = require("express");
const router = express.Router();

const listingController = require("../controllers/listings.js");

router.route("/")
    .get(listingController.index)
    .post()

router.route("/new")
    .get(listingController.renderNewForm);

    module.exports=router;
