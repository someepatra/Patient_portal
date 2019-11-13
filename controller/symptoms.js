const express = require("express");
const router = express.Router();

const Symptoms = require("../models/symptoms.js");

router.get("/all", (req, res) => {
  Symptoms.find({}, (error, allSymptoms) => {
    //console.log(allSymptoms);
    res.send(allSymptoms);
  });
});

router.get("/seed", (req, res) => {
  Symptoms.collection.drop();
  Symptoms.create(
    [
      {
        symptoms: "allergy",
        medicine: "claritin"
      },
      {
        symptoms: "runny nose",
        medicine: "claritin"
      },
      {
        symptoms: "heavy cold",
        medicine: "zyritec"
      },
      {
        symptoms: "feaver",
        medicine: "paracetamol"
      },
      {
        symptoms: "acidity",
        medicine: "ranitidine"
      },
      {
        symptoms: "nausea",
        medicine: "ondansetron"
      },
      {
        symptoms: "pain n feaver",
        medicine: "acetaminophoen"
      },
      {
        symptoms: "cold",
        medicine: "tylenol"
      },
      {
        symptoms: "sinus",
        medicine: "sinex"
      },
      {
        symptoms: "throughing up",
        medicine: "ondansetron"
      }
    ],
    (err, data) => {
      res.send(data);
    }
  );
});

module.exports = router;
