const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const developerSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    logo:{
        url: String,
        filename: String,
    },
    description:{
        type: String,
        required: true,
    },
    contact:{
        type: Number,
        required: true,
    },
    mail:{
        type: String,
        required: true,
    },
    officeAddress:{
        type:String,
        required:true,
    },
    establishedIn:{
        type: Number,
    },
    city:{
        type:String,
    },
    sites:[
        {
            type: Schema.Types.ObjectId,
            ref: "Listing",
        },
    ],
});


const Developer = mongoose.model("Developer",developerSchema);
module.exports = Developer;