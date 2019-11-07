const express = require("express");
const router = express.Router();

router.get("/patients", (req, res) => {
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
        medicine: "an"
      }
    ],
    (err, data) => {
      res.send("good");
    }
  );
});

module.exports = router;
