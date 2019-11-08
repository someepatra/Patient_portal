const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const patientSchema = new Schema({
  last_name: { type: String, required: true },
  first_name: { type: String },
  address: [String],
  d_o_b: { type: String },
  contact: { type: Number },
  email: { type: String },
  check_insurance: { type: Boolean },
  insurance: { type: String },
  co_pay: { type: Number },
  symptoms: String,
  medicine: String,
  pick_up: String
});
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
