const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req,res) => {
    res.send("Welcome");
})

app.listen(8080, (req,res) => {
    console.log("Server is listening to port");
});