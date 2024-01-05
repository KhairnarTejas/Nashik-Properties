const Developer = require("../models/developer");

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
    const {id} = req.params;
    const deletedDeveloper = await Developer.findByIdAndDelete(id);
    console.log(deletedDeveloper);
    res.redirect("/developers");
}