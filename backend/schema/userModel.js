const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const joi = require("@hapi/joi");

let userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true, minlength: 3, maxlength: 30 },
  LastName: { type: String, required: true, minlength: 3, maxlength: 30 },
  MobileNo: { type: String, required: true, minlength: 10, maxlength: 10 },
  UserLogin: {
    UserName: { type: String, required: true, minlength: 3, maxlength: 30 },
    Password: { type: String, required: true, minlength: 3, maxlength: 100 }
  },
  EmailId: { type: String, required: true, minlength: 3, maxlength: 30 }
});

userSchema.methods.userValidToken = function() {
  let token = jwt.sign({ _id: this._id }, config.get("usertoken"));
  return token;
};

let userModel = mongoose.model("userRecord", userSchema);

function ValidationError(message) {
  let Schema = joi.object().keys({
    FirstName: joi
      .string()
      .required()
      .min(3)
      .max(30),
    LastName: joi
      .string()
      .required()
      .min(3)
      .max(30),
    MobileNo: joi
      .string()
      .required()
      .min(3)
      .max(30),
    UserLogin: {
      UserName: joi
        .string()
        .required()
        .min(3)
        .max(30),
      Password: joi
        .string()
        .required()
        .min(3)
        .max(100)
    },
    EmailId: joi
      .string()
      .required()
      .min(3)
      .max(30)
  });
  return Schema.validate(message);
}

function LoginValidationError(message) {
  let Schema = joi.object().keys({
    UserLogin: {
      UserName: joi
        .string()
        .required()
        .min(3)
        .max(30),
      Password: joi
        .string()
        .required()
        .min(3)
        .max(100)
    }
  });
  return Schema.validate(message);
}

module.exports = { userModel, ValidationError, LoginValidationError };
