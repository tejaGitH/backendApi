require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');

const user =require("./routes/user");
const restaurant = require("./routes/restaurant");
const review = require("./routes/review");

const PORT = 3000;
main().catch(err => console.log(err));

async function main() {
    const dbUri = process.env.MONGO_URI;
    console.log('DB-URI',dbUri);

    mongoose
        .connect(
            dbUri,
          //{newUrlParser: true, useUnfiedTopology: true}
        )
        .then(()=>{
            console.log("connected to db..!");
        },(err)=>{
            console.log("something went wrong"+err);
        })
}

const app = express();


app.use(passport.initialize());
require("./passport")(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use('/api/users',user);
app.use('/api/restaurants',restaurant);
app.use('/api/reviews',review);



app.get("/",(req,res)=>{
    res.json({message : "server started"});
})

app.listen(PORT, (req,res)=>{
    console.log(`server on port ${PORT}`)
});