const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

//@route GET api/auth
//@description Test route
//@access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @description Authenticate user & get token
// @access Public
router.post(
  "/",
  // this array contains the middleware that checks/validates the info that the user inputs into the form
  [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Password is required").exists()
  ],

  // if the user does not enter valid reg info, then the server responds with 400 error and the error messages will display
  // *copied also, this code remains unchanged
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // working on registering the users
    // destructure
    // *the body will not have 'name', only email and password, so name is removed from the object
    const { email, password } = req.body;

    try {
      // check if user exists
      let user = await User.findOne({ email });
      console.log(user);
      // check to see if there isn't a user, if doesn't exist, then send an error back
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid Credentials" }] });
      }
      console.log(user.password);
      console.log(password);
      // bcrypt has a method called .compare which takes a plain text password and compares it with an encrypted password
      // .compare returns a promise, so we need to use async/await
      // create a variable that is equal to await bcrypt.compare(password-user enters this when they login, user.password-this comes from the req we made to DB)
      const isMatch = await bcrypt.compare(password, user.password);

      console.log(isMatch);
      //check to see if there isn't a match
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      // 5. sign the token, pass in payload, pass in secret, set a time for the token to expire, pass a function that returns an error
      // if there's an error, if not, then return the token to the client
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
