const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");

router.get("/highlights/:highlight", async (req, res) => {
  try {
    const highlight = req.params.highlight;
    const posts = await BlogPost.find({ highlights: highlight });

    res.render("highlight", {
      highlight,
      posts,
      title: "Wingtip Wanderlust | Highlight",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
