const express = require("express");
const router = express.Router();

// @route       GET api/maintenance
// @description Testing route
// @access type Public
router.get("/", (req, res) => res.send("Maintenance Route"));

module.exports = router;
