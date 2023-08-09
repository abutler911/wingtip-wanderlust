require("dotenv").config({ path: ".env" });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { title: "Wingtip Wanderlust | 2023" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
