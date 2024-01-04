if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");

dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("Connected to db.");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}

app.get("/", (req, res) => {
    res.send("Welcome");
})
//Pull
app.listen(8080, (req, res) => {
    console.log("Server is listening to port");
});