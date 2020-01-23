const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // we need this middleware function to do these things:
  // 1. Get token from header
  const token = req.header("x-auth-token");

  // 2. Check if no token exists
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token exists, authorization denied" });
  }

  // 3. Verify the token
  try {
    // jwt.verify needs two things to decode the token, the token and the jwtSecret from the config folder
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // now, we need to assign a value to the req.user object so need to assign 'decoded' to it, which has the userid in the payload
    req.user = decoded.user;
    // call next() like in all middleware
    next();
  } catch (error) {
    // will run if token not valid
    res.status(401).json({ msg: "Token is not valid" });
  }
};
