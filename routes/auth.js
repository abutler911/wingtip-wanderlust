const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get("/register", (req, res) => {
  res.render("register", { title: "Wingtip Wanderlust | Register" });
});

router.post("/register", async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.username
    ) {
      return res.status(400).send("All fields are required.");
    }
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser) {
      return res.status(400).send("Email or username already in use.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Wingtip Wanderlust | Login" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/explore",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
