const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const developerSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    logo:{
        type: String,
        required: true,
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
    }
});


const Developer = mongoose.model("Developer",developerSchema);
module.exports = Developer;