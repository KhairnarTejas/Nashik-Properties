const Developer = require("../models/developer");
const Listing = require("../models/listing");
const { v4: uuidv4 } = require('uuid');


module.exports.index = async (req,res)=> {
    const allDevelopers = await Developer.find({});
    res.render("developers/index.ejs",{allDevelopers});
}

module.exports.renderNewDeveloperForm = (req,res) =>{
    res.render("developers/new.ejs");
}


module.exports.createNewDeveloper = async (req, res) => {
    try {
        // Ensure the developer data exists in the request body
        if (!req.body.developer) {
            return res.status(400).send("Developer data is required.");
        }

        const {name, description, contact, mail, officeAddress, establishedIn, city } = req.body.developer;

        let uniqueUsername = `developer-${uuidv4()}`;
        username = uniqueUsername;
   
        // Validate that the username is provided and not null
        // if (!username) {
        //     return res.status(400).send("Username is required and cannot be null.");
        // }
        const userId = req.user._id; // Assumes `req.user` contains the logged-in user info

        // Create new developer object
        const newDeveloper = new Developer({
            username,
            name,
            description,
            contact,
            mail,
            officeAddress,
            establishedIn,
            city,
            user: userId // Associate the developer with the user
        });

        // Handle file upload if exists
        if (req.file) {
            let url = req.file.path;
            let filename = req.file.filename;

            newDeveloper.logo = {
                url,
                filename
            };
        }

        await newDeveloper.save();

        res.redirect("/developers");
    } catch (error) {
        console.error("Error creating new developer:", error.message);
        if (error.code === 11000) {
            res.status(400).send("Duplicate key error: Username must be unique.");
        } else {
            res.status(500).send("An error occurred while creating the developer.");
        }
    }
};

module.exports.renderEditForm = async (req,res) => {
    const {id} = req.params;
    const developer = await Developer.findById(id);
    res.render("developers/edit.ejs",{developer});
} 

module.exports.updateDeveloper = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the developer by ID
      const developer = await Developer.findById(id);
  
      // Check if developer exists
      if (!developer) {
        return res.status(404).send('Developer not found.');
      }
  
      // Update other fields
      const updatedFields = { ...req.body.developer };
  
      // Check if a new file is uploaded
      if (req.file) {
        // If a new file is uploaded, update the logo field
        updatedFields.logo = {
          url: req.file.path,
          filename: req.file.filename
        };
      } else {
        // Keep the old logo if no new file is uploaded
        updatedFields.logo = developer.logo;
      }
  
      // Update the developer
      await Developer.findByIdAndUpdate(id, updatedFields, { new: true });
  
      // Redirect or respond as needed
      res.redirect('/developers');
    } catch (err) {
      console.error('Error updating developer:', err);
      res.status(500).send('An error occurred while updating the developer.');
    }
  };
// module.exports.updateDeveloper = async (req,res) => {
//     const {id} = req.params;
//     let url = req.file.path;
//     let filename = req.file.filename;

        
//     const updatedDeveloper = await Developer.findByIdAndUpdate(id,{...req.body.developer});
//     updatedDeveloper.logo = {
//         url,
//         filename
//     };
        
//     console.log(updatedDeveloper);
//     await updatedDeveloper.save();
//     res.redirect("/developers");
// }


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
