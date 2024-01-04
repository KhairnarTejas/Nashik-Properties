const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        default: "https://jooinn.com/images/building-119.jpg",
        set: (v) => v=== ""?"https://jooinn.com/images/building-119.jpg":v,
    },
    price:{
        type:Number,
        required: true,
    },
    location:{
        type:String,
        required:true,
    },
    project_by:{
        type:String,
        required:true,
    },
    designed_by: String,
    legal_adviser:String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;