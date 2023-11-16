if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

// console.log(process.env.SECRET)




const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate"); 
const ExpressError = require("./utils/expressError.js")
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const userrouter = require("./routes/user.js")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")))
// app.use('/public/', express.static('./public'));


// await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
console.log("Database connected successfully");
}

main()
  .then(() => {
    console.log("Database working successfully");
  })
  .catch(err => console.log(err));







const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", ()=>{
  console.log("ERROR IN MONGO SESSION STORE",err);
});

const seasionOptions = {
  store,
  secret :  process.env.SECRET,
  resave : false,
  saveUninitialized :  true,
  cookie :{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: + 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};









// app.get("/", (req, res) => {
//   res.send("hi am root");
// });

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`);
});

//flash alerts 
app.use(session(seasionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})



app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews)
app.use("/",userrouter)


//error  handler
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page not found"));
})



//middleware

app.use((err,req,res,next)=>{
 let {statusCode= 500,message="somthing went wrong"} = err;
 res.status(statusCode).render("error.ejs",{message})
})



//

