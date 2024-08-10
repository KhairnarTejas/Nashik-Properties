// middleware fro the authenticate
const Reveiw=require('./models/reviews.js')
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //info of url for redirect
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "logged in first!");
        res.redirect("/login");
        return;
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Reveiw.findById(reviewId);
    if (!review.givenBy._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the author of this review!")
        res.redirect(`/listings/${id}`);
        return;
    }
    next();
}

