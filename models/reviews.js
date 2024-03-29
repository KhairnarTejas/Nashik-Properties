const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
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