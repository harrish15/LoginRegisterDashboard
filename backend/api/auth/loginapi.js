const express = require("express");
const router = express.Router();
// const joi = require("@hapi/joi");
const U = require("../../schema/userModel");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  let { error } = await U.LoginValidationError(req.body);
  if (!error) {
    return res.status(403).send(error.details[0].message);
  }
  let user = await U.userModel.findOne({
    "UserLogin.UserName": req.body.UserLogin.UserName
  });
  if (!user) {
    return res.status(403).send("Invalid UserName");
  }
  let password = await bcrypt.compare(
    req.body.UserLogin.Password,
    user.UserLogin.Password
  );
  if (!password) {
    return res.status(403).send("Invalid Password");
  }
  let token = user.userValidToken();
  if (!token) {
    return res
      .status(401)
      .send("Token not generated for the given UserName and password");
  }
  res.send(token);
});

module.exports = router;
