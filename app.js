require("dotenv").config({ path: ".env" });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

// Import routes and database connection
const authRoutes = require("./routes/auth");
const exploreRoutes = require("./routes/explore");
const highlightRoutes = require("./routes/highlightRoutes");
const connectDB = require("./config/db");

// Import Passport configuration
require("./config/passport")(passport);

const app = express();
const port = process.env.PORT || 3000;

// Set up static files and view engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body parser and layout configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(flash());

// Session configuration
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Connect to the database
connectDB();

// Routes
app.use("/", authRoutes);
app.use("/", exploreRoutes);
app.use("/", highlightRoutes);

// Default route
app.get("/", (req, res) => {
  res.render("index", { title: "Wingtip Wanderlust | 2023" });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
