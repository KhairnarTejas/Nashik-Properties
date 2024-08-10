const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const passportLocalmongoose=require('passport-local-mongoose');

const userSchema=new Schema({
    email:{
        type:String,
    },
});
mongoose.plugin(passportLocalmongoose)

module.exports=mongoose.model("User",userSchema);

