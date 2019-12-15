const express = require("express");
const router = express.Router();
const Model = require("../schema/userModel");
const M = Model.model;
const bcrypt = require("bcryptjs");
const joi = require("@hapi/joi");

router.post("/userPassword/:token", async (req, res) => {
  try {
    let user = await M.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(403).send("Invalid token Id");
    }
    let result = ValidationError(req.body);
    if (result.error) {
      return res.status(403).send(result.error.details[0].message);
    }
    let d = await bcrypt.compare(user.Password, req.body.Password); //the valus is false for same password
    if (!d) {
      return res
        .status(401)
        .send(
          "Password is same as older password.Please enter another password"
        );
    }

    user.Password = req.body.Password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    let salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(user.Password, salt);
    console.log("password " + user.Password + " and user is " + user);

    if (d) {
    }

    user = await user.save();
    res.send({
      message: "password updated",
      data: user
    });
  } catch (ex) {
    res.send(ex);
  }
});

function ValidationError(error) {
  let schema = {
    Password: joi.string().required()
  };
  return schema.validate(error);
}

module.exports = router;
