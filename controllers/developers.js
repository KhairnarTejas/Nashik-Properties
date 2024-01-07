const Developer = require("../models/developer");
const Listing = require("../models/listing");


module.exports.index = async (req,res)=> {
    const allDevelopers = await Developer.find({});
    res.render("developers/index.ejs",{allDevelopers});
}

module.exports.renderNewDeveloperForm = (req,res) =>{
    res.render("developers/new.ejs");
}

module.exports.createNewDeveloper = async(req,res) => {
    const newDeveloper = new Developer(req.body.developer);
    console.log(req.body.listing);
    await newDeveloper.save();
    res.redirect("/developers");
}

module.exports.renderEditForm = async (req,res) => {
    const {id} = req.params;
    const developer = await Developer.findById(id);
    res.render("developers/edit.ejs",{developer});
} 


module.exports.updateDeveloper = async (req,res) => {
    const {id} = req.params;
    const updatedDeveloper = await Developer.findByIdAndUpdate(id,{...req.body.developer});
    console.log(updatedDeveloper);
    await updatedDeveloper.save();
    res.redirect("/developers");
}


module.exports.destroyDeveloper = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the developer and get the listing IDs
        const developer = await Developer.findById(id).populate("sites");
        const listingIds = developer.sites.map((listing) => listing._id);

        // Delete the listings
        await Listing.deleteMany({ _id: { $in: listingIds } });

        // Delete the developer
        const deletedDeveloper = await Developer.findByIdAndDelete(id);
        console.log("Deleted Developer:", deletedDeveloper);

        res.redirect("/developers");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.showProjectsFromDeveloper = async (req, res) => {
    try {
        let { id } = req.params;
        const allListings = await Listing.find({ project_by: id });

        const developer = await Developer.findById(id);

        if (!developer) {
            console.log("Developer not found");
            return res.status(404).send("Developer not found");
        }

        res.render("developers/projectsfromdeveloper.ejs", { data: { allListings, id, developer } });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
