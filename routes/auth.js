const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET route for registration page
router.get("/register", (req, res) => {
  res.render("register", { title: "Wingtip Wanderlust | Register" });
});

module.exports = router;
