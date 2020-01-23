const express = require("express");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Car");
const User = require("../../models/User");

/// @route      GET api/cars/mycars
// @description get the current user's profile by using the user id
// @access      Private
router.get("/mycars", auth, async (req, res) => {
  try {
    const cars = await Car.findOne({
      user: req.user.id
    }).populate("user");
    if (!cars) {
      return res
        .status(400)
        .json({ msg: "There are no cars for the specified user" });
    }
    res.json(cars);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
