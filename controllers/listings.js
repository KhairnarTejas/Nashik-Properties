const Developer = require("../models/developer");
const Listing = require("../models/listing");

module.exports.index = async(req,res) =>{
    const allListings = await Listing.find({}).populate({
        path: "project_by",
        model: "Developer", // Make sure to specify the model name if it's different
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
    // console.log(req.body.listing);
    const developer = await Developer.findOne({name: req.body.listing.project_by});
    console.log(developer);
    newListing.project_by=developer._id;
    developer.sites.push(newListing);
    await developer.save();
    await newListing.save();
    res.redirect("/listings");
    //res.send("success");
}

module.exports.showListing = async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("project_by");
    res.render("listings/show.ejs",{listing});
}

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const allDevelopers = await Developer.find({});
    let listing = await Listing.findById(id).populate({
        path: "project_by",
        model: "Developer", // Make sure to specify the model name if it's different
      });
    res.render("listings/edit.ejs", {listing,allDevelopers});
}

module.exports.updateListing = async(req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    await listing.save();
    res.redirect(`/listings/${id}`);
}


module.exports.destroyListing = async (req, res) => {
    let { id, developerId } = req.params;

    try {
        console.log("Developer ID:", developerId); // Log the developerId

        // Delete the listing
        const deletedListing = await Listing.findByIdAndDelete(id, {
            $pull: { developer: developerId }
        });

        // Find the developer
        let developer = await Developer.findById(developerId);

        // Check if the developer exists
        if (!developer) {
            console.log("Developer not found");
            return res.status(404).send("Developer not found");
        }

        // Remove the listing from the developer's sites
        developer.sites.pull(deletedListing._id);
        await developer.save();

        console.log(developer);
        res.redirect("/listings");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
