if (process.env.NODE_ENV != "production") {
  // we are writing this condition so that our .env variables will be not shared with others when it is hosted because that time we will set NODE_ENV value to "production"
  require("dotenv").config();
}
// console.log(process.env.CLOUD_API_SECRET); //24DKvMtJ2JdzLzQBK8JmuWEUtis

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
// MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views/listings"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js"); // requiring the server side schema for new listing validation and we will make one function of this and pass that function as middleware before listing
const { reviewSchema } = require("./schema.js"); // requiring the server side schemar for new reviews validation and we will create a function of this schema and pass that function as middleware before posting the reviews
const Review = require("./models/review.js");

const listingRoutes = require("./routes/listings.js"); // here we are requiring all listings methods as transferred all paths from app.js to routes/listings.js
const reviewRoutes = require("./routes/review.js"); // here we are requiring all reviews methods as transferred all paths from app.js to routes/review.js
const userRoutes = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter: 24*3600, //mongo session
})

store.on("error", ()=>{
  console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionoption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
};


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  // await mongoose.connect(MONGO_URL);
  await mongoose.connect(dbUrl);
}

// app.get("/", (req, res) => {
//   res.send("This is anshu, welcomes you to the website");
// });

app.use(session(sessionoption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//creating flash
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // accessing current user details, so that we can access currUser details to other ejs templates
  next();
});

// using routes:- listing at place of /listings as we had required the routes path in the listing
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

// Page not found error for all other routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.status(status).render("error.ejs", { err });
});

app.listen(8081, () => {
  console.log("app is listening to port 8081");
});
