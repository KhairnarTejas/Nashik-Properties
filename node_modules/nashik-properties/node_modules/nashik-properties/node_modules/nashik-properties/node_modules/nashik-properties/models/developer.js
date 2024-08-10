const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const developerSchema = new Schema({
   
    name: {
        type: String,
        required: true, // Ensure name is required
    },
    logo: {
        url: {
            type: String,
            required: true, // Ensure logo URL is required
        },
        filename: {
            type: String,
            required: true, // Ensure logo filename is required
        },
    },
    description: {
        type: String,
        required: true, // Ensure description is required
    },
    contact: {
        type: Number,
        // required: true, // Ensure contact number is required
    },
    mail: {
        type: String,
        // required: true, // Ensure email is required
        // unique: true, // Ensure email is unique
        // match: [/.+@.+\..+/, 'Please fill a valid email address'], // Validate email format
    },
    officeAddress: {
        type: String,
        // required: true, // Ensure officeAddress is required
    },
    establishedIn: {
        type: Number,
        // required: true, // Ensure establishedIn is required
    },
    city: {
        type: String,
        // required: true, // Ensure city is required
    },
    sites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing",
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true // Ensure that each developer is associated with a user
    }
}, {
    timestamps: true // Add timestamps for creation and update times
});

const Developer = mongoose.model("Developer", developerSchema);
module.exports = Developer;




// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const developerSchema = new Schema({
//     name:{
//         type:String,
//         required: true,
//     },
//     logo:{
//         url: String,
//         filename: String,
//     },
//     description:{
//         type: String,
//         // required: true,
//     },
//     contact:{
//         type: Number,
//         // required: true,
//     },
//     mail:{
//         type: String,
//         // required: true,
//     },
//     officeAddress:{
//         type:String,
//         // required:true,
//     },
//     establishedIn:{
//         type: Number,
//     },
//     city:{
//         type:String,
//     },
//     sites:[
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Listing",
//         },
//     ],
// });


// const Developer = mongoose.model("Developer",developerSchema);
// module.exports = Developer;