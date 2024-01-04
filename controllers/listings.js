const Listing = require("../models/listing");

module.exports.index = async(req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{
        allListings
    });   
}

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
}

module.exports.createListing = async(req, res) => {
    const newListing = new Listing(req.body.listing);
    console.log(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}