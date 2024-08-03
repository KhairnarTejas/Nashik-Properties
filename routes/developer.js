const express = require("express");
const router = express.Router({ mergeParams: true });

const developerController = require("../controllers/developers.js");
const Listing=require('../models/listing.js');


const multer = require("multer");
const {
    storage
} = require("../cloudConfig.js");
const upload = multer({
    storage
});




router.route("/")
    .get(developerController.index)
    .post(upload.single('developer[logo]'),developerController.createNewDeveloper);

router.route("/new")
    .get(developerController.renderNewDeveloperForm)

    

router.route("/:id/edit")
    .get(developerController.renderEditForm)

router.route("/:id")
    .get(developerController.showProjectsFromDeveloper)
    .put(upload.single('developer[logo]'),developerController.updateDeveloper)
    .delete(developerController.destroyDeveloper);
    
    router.get('/moreproject/:id', async (req, res) => {
        const { id } = req.params; // Extract the ID from the URL parameters
        
        try {
            // Find all listings where project_by matches the specified developer ID and populate "project_by" with "Developer" data
            const allListings = await Listing.find({ project_by: id }).populate({
                path: 'project_by',
                model: 'Developer',
            });
    
            console.log("hi commercial");
            console.log(allListings);
            res.render("developers/projectsfromdeveloper.ejs", {
                allListings
            });
           
        } catch (error) {
            console.error("Error fetching listings:", error);
            res.status(500).send("An error occurred while fetching listings.");
        }
    });

module.exports=router;