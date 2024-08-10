const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true, // Ensure username is required
            unique: true   // Ensure username is unique
        },
        comment:{
            type: String,
        },
        rating: {
            type:Number,
            min: 0,
            max: 5,
        },
        givenBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }
)

const Review = mongoose.model("Review", reviewSchema);
module.exports=Review;