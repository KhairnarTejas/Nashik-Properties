const express = require("express");
const router = express.Router();

const developerController = require("../controllers/developers.js");



router.route("/")
    .get(developerController.index)
    .post(developerController.createNewDeveloper);

router.route("/new")
    .get(developerController.renderNewDeveloperForm)
    
router.route("/:id/edit")
    .get(developerController.renderEditForm)

router.route("/:id")
    .put(developerController.updateDeveloper)
    .delete(developerController.destroyDeveloper);



module.exports=router;