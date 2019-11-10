const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const bcrypt = require("bcrypt");

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs", {
    error: false
  });
});
// router.get("/seed", (req, res) => {
//   //sessionsController.collection.drop();
//   sessionsController.create(
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
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (foundUser) {
      //console.log(req.body);
      //console.log(foundUser);
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect("/patients");
      } else {
        // res.send("wrong password");
        res.render("./sessions/new.ejs", {
          error: true
        });
      }
    } else {
      res.render("./sessions/new.ejs", {
        error: true
      });
    }
  });
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
module.exports = router;
