//dependencies
const express = require("express");
const router = express.Router();
//model
const Patient = require("../models/patient_schema");

// router.listen(port, () => {
//   console.log("listening on port", port);
// });

//test route
router.get("/", (req, res) => {
  res.send("router is running in patient");
});
//new
router.get("/patients/new", (req, res) => {
  res.render("new.ejs");
});
//index show all patients
router.get("/patients", (req, res) => {
  Patient.find({}, (error, allPatients) => {
    if (error) {
      res.send(error);
    } else {
      res.render("index.ejs", { patient: allPatients });
    }
  });
});
//create
router.post("/patients", (req, res) => {
  if (req.body.check_insurance === "on") {
    req.body.check_insurance = true;
  } else {
    req.body.check_insurance = false;
    req.body.insurance = "None";
    req.body.co_pay = 100;
  }
  Patient.create(req.body, (error, createdPatient) => {
    if (error) {
      res.send(error);
    } else {
      res.redirect("/patients");
    }
  });
});

//show by patinet
router.get("/patients/:id", (req, res) => {
  Patient.findById(req.params.id, (error, foundPatient) => {
    res.render("shows.ejs", { patient: foundPatient });
  });
});
//delete patient data
router.delete("/patients/:id", (req, res) => {
  Patient.findByIdAndRemove(req.params.id, () => {
    res.redirect("/patients");
  });
});
//edit a ptient data
router.get("/patients/:id/edit", (req, res) => {
  Patient.findById(req.params.id, (error, foundPatient) => {
    if (error) {
      console.log(error);
    } else {
      res.render("edit.ejs", { patient: foundPatient });
    }
  });
});
//update patient
router.put("/patients/:id", (req, res) => {
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
