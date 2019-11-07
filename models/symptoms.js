const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const symptomsSchema = Schema({
  medicine: String,
  symptoms: [String]
});

const Symptoms = mongoose.model("Symptoms", symptomsSchema);

module.exports = Symptoms;
