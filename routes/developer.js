const express = require("express");
const router = express.Router({ mergeParams: true });

const developerController = require("../controllers/developers.js");


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



module.exports=router;