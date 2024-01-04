if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const MongoStore = require("connect-mongo");


dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("Connected to db.");
    })
    .catch(err => console.log(err));

async function main() {
    await  mongoose.connect(dbUrl);
}






const listingRouter = require("./routes/listing.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "/public")));





app.use("/listings",listingRouter);


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