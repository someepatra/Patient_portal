//dependencies
const express = require("express");
const router = express.Router();
//model
const Patient = require("../models/patient_schema");

//new
router.get("/new", (req, res) => {
  res.render("new.ejs");
});
//index show all patients
router.get("/", (req, res) => {
  if (req.session.currentUser) {
    Patient.find({}, (error, allPatients) => {
      if (error) {
        res.send(error);
      } else {
        res.render("index.ejs", { patient: allPatients });
      }
    });
  } else {
    res.redirect("/");
  }
});
//create
router.post("/", (req, res) => {
  if (req.body.check_insurance === "on") {
    req.body.check_insurance = true;
  } else {
    req.body.check_insurance = false;
    req.body.insurance = "None";
    req.body.co_pay = 100;
  }
  //console.log(req.body.address);
  Patient.create(req.body, (error, createdPatient) => {
    if (error) {
      res.send(error);
    } else {
      res.redirect("/patients");
    }
  });
});

//show by patinet
router.get("/:id", (req, res) => {
  Patient.findById(req.params.id, (error, foundPatient) => {
    res.render("shows.ejs", { patient: foundPatient });
  });
});
//delete patient data
router.delete("/:id", (req, res) => {
  Patient.findByIdAndRemove(req.params.id, () => {
    res.redirect("/patients");
  });
});
//edit a ptient data
router.get("/:id/edit", (req, res) => {
  Patient.findById(req.params.id, (error, foundPatient) => {
    if (error) {
      console.log(error);
    } else {
      res.render("edit.ejs", { patient: foundPatient });
    }
  });
});
//update patient
router.put("/:id", (req, res) => {
  Patient.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPatient) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/patients");
      }
    }
  );
});
module.exports = router;
