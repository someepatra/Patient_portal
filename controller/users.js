const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});
// router.get("/seed", (req, res) => {
//   //usersController.collection.drop();
//   usersController.create(
//     [
//       {
//         username: "somi",
//         password: "patra"
//       },
//       {
//         username: "mausumi",
//         password: "patra"
//       }
//     ],
//     (err, data) => {
//       res.send(data);
//     }
//   );
// });

router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});
module.exports = router;
