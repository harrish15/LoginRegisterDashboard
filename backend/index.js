const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
let morgan = require("morgan");
let port = process.env.Port || 4003;
let user = require("./api/auth/loginapi");
let auth = require("./api/userAuthapi");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (config.get("host.mail") === "development mode") {
  app.use(morgan("tiny"));
}
if (!config.get("usertoken")) {
  console.log(`Fatal error.Please set the token.`);
  process.exit(1);
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,x-auth-token,Accept"
  );
  next();
});

console.log(`production mode: ${process.env.Node_Env}`);
console.log(`development mode : ${app.set("env")}`);

console.log(`name : ${config.get("name")}`);
console.log(`mail : ${config.get("host.mail")}`);

//these variables can be displayed only after their values are set in command prompt
console.log(`password: ${config.get("Password")}`);
if (!config.get("usertoken")) {
  console.log(`Fatal error: Token not set. Please set the token`);
  process.exit(1);
}
console.log(`token: ${config.get("usertoken")}`);
mongoose
  .connect("mongodb://localhost/loginregisterdashboard", {
    useNewUrlParser: true
  })
  .then(() => console.log("connected to database"))
  .catch(err => console.log("something went wrong", err));

app.use("/api/user", user);
app.use("/api/auth", auth);
app.listen(port, () => console.log(`server working on port number: ${port}`));
