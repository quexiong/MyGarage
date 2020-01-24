const express = require("express");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Car = require("../../models/Car");
const User = require("../../models/User");

// @route       GET api/cars/mycars
// @description get the current user's profile by using the user id
// @access      Private
router.get("/mycars", auth, async (req, res) => {
  try {
    const cars = await Car.find({
      user: req.user.id
    });
    if (cars.length == 0) {
      return res.status(400).json({ msg: "There are no cars for this user" });
    }
    res.json(cars);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route       POST api/cars
// @description Create a new car
// @access      Private
router.post(
  "/",
  [
    auth,
    [
      check("year", "Year of car is required")
        .not()
        .isEmpty(),
      check("make", "Make of car is required")
        .not()
        .isEmpty(),
      check("model", "Model of car is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create car object
    const { year, make, model } = req.body;
    let carFields = {};
    carFields.user = req.user.id;
    carFields.year = year;
    carFields.make = make;
    carFields.model = model;

    try {
      let car = new Car(carFields);
      await car.save();
      res.json(car);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       POST api/cars/:id
// @description Update a car
// @access      Private
router.put(
  "/:id",
  [
    auth,
    [
      check("year", "Year of car is required")
        .not()
        .isEmpty(),
      check("make", "Make of car is required")
        .not()
        .isEmpty(),
      check("model", "Model of car is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create car object
    const { year, make, model } = req.body;
    let carFields = {};
    carFields.id = req.params.id;
    carFields.user = req.user.id;
    carFields.year = year;
    carFields.make = make;
    carFields.model = model;

    try {
      const car = await Car.findOneAndUpdate(
        { _id: carFields.id },
        {
          $set: carFields
        },
        { new: true }
      );
      res.json(car);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       POST api/cars/:carid
// @description Delete car by id
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ msg: "Car not found" });
    }
    await car.remove();
    res.json({ msg: "Car was removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
