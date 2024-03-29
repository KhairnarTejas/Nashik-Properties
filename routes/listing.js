const express = require("express");
const router = express.Router({ mergeParams: true });

const multer = require("multer");
const {
    storage
} = require("../cloudConfig.js");
const upload = multer({
    storage
});
const Listing=require('../models/listing.js');
const listingController = require("../controllers/listings.js");

router.route("/")
    .get(listingController.index)
    .post(upload.single('listing[image]'), listingController.createListing);

router.route("/new")
    .get(listingController.renderNewForm);

    router.get("/residential",async(req,res)=>{    
        const allListings = await Listing.find({property_type:"Residential"}).populate({
            path: "project_by",
            model: "Developer",
        });
    console.log(allListings);
        console.log("hi residential ");
        // res.send("HI");
        res.render("listings/residential.ejs", {
            allListings
        });
    });
    router.get("/commercial",async(req,res)=>{    
        const allListings = await Listing.find({property_type:"Commercial"}).populate({
            path: "project_by",
            model: "Developer",
        });
    
        console.log("hi commercial");
        console.log(allListings);
    
        // res.send("hi commercial");
        res.render("listings/commercial.ejs", {
            allListings
        });
    });
    router.get("/plot",async(req,res)=>{    
        const allListings = await Listing.find({property_type:"Plot"}).populate({
            path: "project_by",
            model: "Developer",
        });
    
        console.log("hi plot");
        // res.send("hi plot");
        res.render("listings/plot.ejs", {
            allListings
        });
    });

router.route("/:id")
    .get(listingController.showListing)
    .put(upload.single('listing[image]'),listingController.updateListing)

router.route("/:id/:developerId")
    .delete(listingController.destroyListing);

router.route("/:id/edit")
    .get(listingController.renderEditForm);

// router.route("/residential")
//     .get(listingController.residential); 
// router.route("/commercial")
//     .get(listingController.commercial); 
// router.route("/plot")
//     .get(listingController.plot); 


module.exports=router;
