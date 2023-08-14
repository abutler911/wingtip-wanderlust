const express = require("express");
const multer = require("multer");
const BlogPost = require("../models/BlogPost");
const router = express.Router();
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/explore", ensureAuthenticated, async (req, res) => {
  try {
    const blogPosts = await BlogPost.find()
      .populate("author", "username")
      .exec();

    const highlights = await BlogPost.distinct("highlights");

    res.render("explore", {
      title: "Wingtip Wanderlust | Explore",
      blogPosts,
      highlights,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});

router.get("/explore/create", ensureAuthenticated, (req, res) => {
  res.render("create-post", { title: "Wingtip Wanderlust | Create Post" });
});

router.post(
  "/explore/create",
  ensureAuthenticated,
  upload.array("images", 10),
  async (req, res) => {
    try {
      const {
        title,
        content,
        city,
        state,
        country,
        travelDate,
        highlights,
        rating,
        budget,
        activities,
        accommodations,
      } = req.body;
      const images = req.files.map((file) => file.path);

      // Create a new blog post
      const blogPost = new BlogPost({
        title,
        content,
        city,
        state,
        country,
        travelDate,
        highlights: highlights ? highlights.split(",") : [],
        rating,
        budget,
        activities: activities ? activities.split(",") : [],
        accommodations,
        images,
        author: req.user._id,
      });

      await blogPost.save();

      res.redirect("/explore");
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong.");
    }
  }
);

module.exports = router;
