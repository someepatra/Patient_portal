const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const patientSchema = new Schema(
  {
    last_name: { type: String, required: true },
    first_name: { type: String },
    address: { type: String },
    d_o_b: { type: String },
    contact: { type: Number },
    email: { type: String },
    insurance: { type: String },
    co_pay: { type: Number }
  }
  //{ timestamps: true }
);
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;