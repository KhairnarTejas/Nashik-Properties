const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/users.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
        res.render("users/signup.ejs");
})
//npm i cloudinary multer-storage-cloudinary  
router.post("/signup", async (req, res) => {
        console.log("hi");
        try {
                let { username, email, password } = req.body;
                const newUser = new User({ email, username });
                const registerUser = await User.register(newUser, password);
                console.log("hi");
                console.log(registerUser);
                req.login(registerUser, (err) => {
                        if (err) {
                                return next(err);
                        }
                        req.flash("success", "Welcome to Nashik Properties!");
                        res.redirect("/listings");
                }
                );
        }
        catch (e) {
                req.flash("error", e.message);
                res.redirect("/signup");
        }
});

router.get("/deleteallusers", async (req, res) => {

        let users = await User.findOneAndDelete({});
        console.log(users);
        res.redirect('/listings')
});


router.get("/login", (req, res) => {
        res.render("users/login.ejs");
})

router.post("/login", passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
}),
        (req, res) => {
                req.flash("success", "Welcome to Nashik Properties! You logged in successfully!");
                let redirectUrl = res.locals.redirectUrl || "/listings";
                res.redirect(redirectUrl);
                //res.redirect("/listings");
});



router.get("/logout", (req, res) => {
        req.logOut((err) => {
                if (err) {
                        return next(err);
                }
                req.flash("success", "You are logged out!");
                res.redirect("/listings");
        })
})

module.exports = router;



// router.get("/userprofile", passport.authenticate('jwt', { session: false }), (req, res) => {

//         Profile.findOne({ user: req.user.id }).then(profile => {
//           if (!profile) {
//             return res.status(404).json({ error: "No Profile Found" });
//           }
//           else {
//             res.json(profile);
//           }
//         }).catch(err => {
//           console.log(err);
//         })
//       });