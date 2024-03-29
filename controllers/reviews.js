const Listing = require("../models/listing.js")//require model listing
const mongoose=require('mongoose')
const Review = require("../models/reviews.js");

const createNewReview=async (req, res) => {
    console.log('Hi create review');
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newreview = new Review(req.body.review);
    listing.reviews.push(newreview);
    newreview.givenBy = req.user._id;
    await newreview.save();
    console.log(newreview);
    await listing.save();
    req.flash("success","new review created!");
    res.redirect(`/listings/${id}`);
}
const DeleteReview= async (req, res) => {
    let { id, reviewId } = req.params;
    let rev= await Review.findById(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });//remove review from reviews array whose id=reviewId
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}

module.exports={createNewReview,DeleteReview}
