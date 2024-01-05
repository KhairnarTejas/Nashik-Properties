const Developer = require("../models/developer");
const Listing = require("../models/listing");

module.exports.index = async(req,res) =>{
    const allListings = await Listing.find({}).populate({
        path: "project_by"
    });
    res.render("listings/index.ejs",{
        allListings
    });   
}

module.exports.renderNewForm = async (req,res) => {
    const allDevelopers = await  Developer.find({});
    res.render("listings/new.ejs",{allDevelopers});
}

module.exports.createListing = async(req, res) => {
    const newListing = new Listing(req.body.listing);
    console.log(req.body.listing);
    let developer = Developer.findOne({name:"Roongta Developers"});
    console.log(developer);
    // await newListing.save();
    // res.redirect("/listings");
    res.send("success");
}

module.exports.showListing = async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("project_by");
    res.render("listings/show.ejs",{listing});
}

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}

module.exports.updateListing = async(req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    await listing.save();
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}