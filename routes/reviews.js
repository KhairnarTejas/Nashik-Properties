const { isLoggedIn,isReviewAuthor,saveRedirectUrl} = require("../middleware.js");//require middleware
const User = require("../models/users.js");

const express=require('express')
const router=express.Router({ mergeParams: true });
const {createNewReview,DeleteReview}=require('../controllers/reviews.js')

router.route('/reviews')
    .post(isLoggedIn,createNewReview)

router.route('/:reviewId/reviews')
    .delete(isLoggedIn,isReviewAuthor,DeleteReview)


module.exports=router

