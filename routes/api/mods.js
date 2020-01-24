const express = require("express");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Mod = require("../../models/Mod");
const Car = require("../../models/Car");
const User = require("../../models/User");

// @route       GET api/mods/:id
// @description Get all mod items for a user
// @access type Private
// Retrieve all mod items related to specific user - will use this to populate the client views
router.get("/:user_id", auth, async (req, res) => {
  try {
    let mod = await Mod.find({
      user: req.params.user_id
    });
    if (mod.length == 0) {
      return res
        .status(400)
        .json({ msg: "There are no mod jobs for this car" });
    }
    res.json(mod);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route       GET api/mods/:car_id
// @description Get all mod items for a car
// @access type Private
// Retrieve all mod items related to specific car - will use this to populate the client views
// router.get("/:car_id", auth, async (req, res) => {
//   try {
//     let mod = await Mod.find({
//       car: req.params.car_id
//     });
//     if (mod.length == 0) {
//       return res
//         .status(400)
//         .json({ msg: "There are no mod jobs for this car" });
//     }
//     res.json(mod);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

// @route       POST api/mods/:car_id
// @description Add mod job to selected car
// @access type Private
router.post(
  "/:car_id",
  [
    auth,
    [
      check("mileage", "Mileage of car is required")
        .not()
        .isEmpty(),
      check("job", "Mod job performed is required")
        .not()
        .isEmpty(),
      check("cost", "Cost of mod job is required")
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
      let newModItemFields = {};
      newModItemFields.user = req.user.id;
      newModItemFields.car = req.params.car_id;
      newModItemFields.mileage = mileage;
      newModItemFields.job = job;
      newModItemFields.cost = cost;
      if (notes) {
        newModItemFields.notes = notes;
      }
      console.log(newModItemFields);
      let mod = new Mod(newModItemFields);
      await mod.save();
      res.json(mod);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       PUT api/mods/:car_id/:mod_id
// @description Edit selected mod job on selected car
// @access type Private
router.put(
  "/:car_id/:id",
  [
    auth,
    [
      check("mileage", "Mileage of car is required")
        .not()
        .isEmpty(),
      check("job", "Mod job performed is required")
        .not()
        .isEmpty(),
      check("cost", "Cost of modenence job is required")
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
      let newModItemFields = {};
      newModItemFields.id = req.params.id;
      newModItemFields.user = req.user.id;
      newModItemFields.car = req.params.car_id;
      newModItemFields.mileage = mileage;
      newModItemFields.job = job;
      newModItemFields.cost = cost;
      if (notes) {
        newModItemFields.notes = notes;
      }
      console.log(newModItemFields);
      let mod = await Mod.findOneAndUpdate(
        { _id: newModItemFields.id },
        {
          $set: newModItemFields
        },
        { new: true }
      );
      res.json(mod);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       DELETE api/mods/:id
// @description Delete mod job by id
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let mod = await Mod.findById(req.params.id);
    if (!mod) {
      return res.status(404).json({ msg: "Mod job not found" });
    }
    await mod.remove();
    res.json({ msg: "Mod job was removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
