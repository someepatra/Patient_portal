const express = require("express");
const router = express.Router();

const Symptoms = require("../models/symptoms.js");

router.get("/all", (req, res) => {
  Symptoms.find({}, (error, allSymptoms) => {
    console.log(allSymptoms);
    res.send(allSymptoms);
  });
});

router.get("/seed", (req, res) => {
  Symptoms.collection.drop();
  Symptoms.create(
    [
      {
        symptoms: "cold",
        medicine: "tylinoil"
      },
      {
        symptoms: "feaver",
        medicine: "paracetamol"
      },
      {
        symptoms: "acidity",
        medicine: "antacid"
      }
    ],
    (err, data) => {
      res.send(data);
    }
  );
});

module.exports = router;
