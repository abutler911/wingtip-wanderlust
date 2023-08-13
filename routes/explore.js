const express = require("express");
const router = express.Router();

router.get("/explore", (req, res) => {
  res.render("explore", { title: "Wingtip Wanderlust | Explore" });
});

module.exports = router;
