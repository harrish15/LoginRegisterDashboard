let express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs");
let U = require("../schema/userModel");
let auth = require("./middleware/auth");

//When deleting any record check for Admin
//let Admin = require("./middleware/admin");

//loggedIn User
router.get("/me", auth, async (req, res) => {
  let data = await U.userModel
    .findById(req.userModel._id)
    .select("-UserLogin.Password");
  res.send(data);
});

//Get All User
router.get("/allUser", async (req, res) => {
  let user = await U.userModel.find({}).select("-UserLogin.Password");
  if (!user) {
    return res.status(403).send("No Users Found!");
  }
  res.send(user);
});

//Create new User
router.post("/newUser", async (req, res) => {
  let { error } = U.ValidationError(req.body);
  if (error) {
    return res.status(403).send(error.details[0].message);
  }
  let username = await U.userModel.findOne({
    "UserLogin.UserName": req.body.UserLogin.UserName
  });
  if (username) {
    return res.status(401).send("UserName already exists");
  }
  let data = new U.userModel({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    MobileNo: req.body.MobileNo,
    UserLogin: req.body.UserLogin,
    EmailId: req.body.EmailId
  });
  let salt = await bcrypt.genSalt(10);
  data.UserLogin.Password = await bcrypt.hash(data.UserLogin.Password, salt);

  let items = await data.save();

  let token = items.userValidToken();

  res
    .header("x-auth-token", token)
    .send({ message: "registration successful", data: items, token: token });
});

module.exports = router;
