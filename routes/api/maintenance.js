const express = require("express");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Maintenance = require("../../models/Maintenance");
const Car = require("../../models/Car");
const User = require("../../models/User");

// @route       GET api/maintenance/:car_id
// @description Get all maintenance items for a car
// @access type Private
// Retrieve all maintenance items related to specific car - will use this to populate the client views

// @route       POST api/maintenance/:car_id
// @description Add maintenance job to selected car
// @access type Private
router.post(
  "/:car_id",
  [
    auth,
    [
      check("mileage", "Mileage of car is required")
        .not()
        .isEmpty(),
      check("job", "Maintenance job performed is required")
        .not()
        .isEmpty(),
      check("cost", "Cost of maintenence job is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { mileage, job, cost, notes } = req.body;
      let newMaintItemFields = {};
      newMaintItemFields.user = req.user.id;
      newMaintItemFields.car = req.params.car_id;
      newMaintItemFields.mileage = mileage;
      newMaintItemFields.job = job;
      newMaintItemFields.cost = cost;
      if (notes) {
        newMaintItemFields.notes = notes;
      }
      console.log(newMaintItemFields);
      let maintenance = new Maintenance(newMaintItemFields);
      await maintenance.save();
      res.json(maintenance);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       PUT api/maintenance/:car_id/:maint_id
// @description Edit selected maintenance job on selected car
// @access type Private
router.put(
  "/:car_id/:maint_id",
  [
    auth,
    [
      check("mileage", "Mileage of car is required")
        .not()
        .isEmpty(),
      check("job", "Maintenance job performed is required")
        .not()
        .isEmpty(),
      check("cost", "Cost of maintenence job is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { mileage, job, cost, notes } = req.body;
      let newMaintItemFields = {};
      newMaintItemFields.id = req.params.maint_id;
      newMaintItemFields.user = req.user.id;
      newMaintItemFields.car = req.params.car_id;
      newMaintItemFields.mileage = mileage;
      newMaintItemFields.job = job;
      newMaintItemFields.cost = cost;
      if (notes) {
        newMaintItemFields.notes = notes;
      }
      console.log(newMaintItemFields);
      let maintenance = await Maintenance.findOneAndUpdate(
        { _id: newMaintItemFields.id },
        {
          $set: newMaintItemFields
        },
        { new: true }
      );
      res.json(maintenance);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
