//New comment


if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");

const Listing=require('./models/listing.js');


// dbUrl = process.env.ATLASDB_URL;
// dbUrl='mongodb+srv://siddharth-sahane:kxQh9Eg96l7gsTL8@cluster0.idmnbmp.mongodb.net/Nashik-Propertiess?retryWrites=true&w=majority&appName=Cluster0';
// dbUrl='mongodb+srv://siddharth-sahane:kxQh9Eg96l7gsTL8@cluster0.idmnbmp.mongodb.net/Nashik-Propertiess?retryWrites=true&w=majority&appName=Cluster0';
// dbUrl='mongodb+srv://siddharth-sahane:kxQh9Eg96l7gsTL8@cluster0.idmnbmp.mongodb.net/Nashik-Property?retryWrites=true&w=majority&appName=Cluster0';
dbUrl='mongodb://localhost:27017/NashikPropertytejas';

main()
    .then(() => {
        console.log("Connected to db.");
    })
    .catch(err => console.log(err));

async function main() {
    await  mongoose.connect(dbUrl);
}

//Acassa


// for using passport
const passport=require("passport");// require passport for authentication
const LocalStrategy=require("passport-local");
const User=require("./models/users.js");




const listingRouter = require("./routes/listing.js");
const developerRouter = require("./routes/developer.js");

const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

//for session setup
const session=require("express-session");// require session
const flash=require("connect-flash");//require flash

// sessionObject is parameter
const sessionOption={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,//millisecond of 7 days
        maxAge:1000*60*60*24*7,//
       httpOnly:true//for security purpose:to avoid cross scripting attack
    },
};
app.use(session(sessionOption));// to use sessions
app.use(flash());

// for authentication using passport
app.use(passport.initialize())//middleware that initialize passport
app.use(passport.session());//app.use(session(sessionOption)); require for a passport to login once in the session
passport.use(new LocalStrategy(User.authenticate()));//all users should be authenticate through local strategy
passport.serializeUser(User.serializeUser());//store(serialize) information of user in session
passport.deserializeUser(User.deserializeUser());//remove(deserialize) information of user in session



app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;    
    next();//go for next
})


app.get("/", async(req, res) => {
   res.render('Home.ejs');
})

app.get('/search', async (req, res) => {
    try {
      const query = req.query.query || '';
  
      // Perform a search on your listings based on the name field
      const results = await Listing.find({
        title: { $regex: query, $options: 'i' } // Case-insensitive search
      }).populate('project_by');
  
      // Render the results in your search results page
      res.render('listings/index.ejs', { allListings: results });
    } catch (err) {
      console.error("Error during search:", err);
      res.status(500).send("An error occurred while searching.");
    }
  });


app.get("/demouser", async(req, res) => {
    let fakeuser=new User({
        email:"student@gmail.com",
        username:"delta-student"
    });
   let registerUser=await User.register(fakeuser,"helloworld");//store new user instance in database
   res.send(registerUser);
})

app.get("/deleteallRevies",async(req,res)=>{
  let List=  await User.deleteMany({});
  console.log(List);
    res.send("delete all");
})


app.use("/listings",listingRouter);
app.use("/developers",developerRouter);
app.use('/listings/:id', reviewRouter)//for reviews route
app.use("/",userRouter);//for user route


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
});


app.get("/", (req, res) => {
    res.send("Welcome");
})
//Pull
app.listen(8080, (req, res) => {
    console.log("Server is listening to port");
});


//ok
