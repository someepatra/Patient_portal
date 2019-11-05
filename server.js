//dependencies
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Patient = require("./models/patient_schema.js");

const app = express();
const db = mongoose.connection;
//port
const port = 3000;
//controller
//const = require("./controllers/patient.js");
//config
//const Product = require("./models/product_schema.js");

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//app.use(patientsController);
//connect mongo db
mongoose.connect("mongodb://localhost:27017/patient_portals", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.use(express.json());
//port listen
app.listen(port, () => {
  console.log("listening on port", port);
});

//test route
app.get("/", (req, res) => {
  res.send("app is running");
});
//new
app.get("/patients/new", (req, res) => {
  res.render("new.ejs");
});
//index show all patients
app.get("/patients", (req, res) => {
  Patient.find({}, (error, allPatients) => {
    if (error) {
      res.send(error);
    } else {
      res.render("index.ejs", { patient: allPatients });
    }
  });
});
//create
app.post("/patients", (req, res) => {
  if (req.body.check_insurance === "on") {
    req.body.check_insurance = true;
  } else {
    req.body.check_insurance = false;
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
app.get("/patients/:id", (req, res) => {
  Patient.findById(req.params.id, (error, foundPatient) => {
    res.render("shows.ejs", { patient: foundPatient });
  });
});
//delete patient data
app.delete("/patients/:id", (req, res) => {
  Patient.findByIdAndRemove(req.params.id, () => {
    res.redirect("/patients");
  });
});
//edit a ptient data
app.get("/patients/:id/edit", (req, res) => {
  Patient.findById(req.params.id, (error, foundPatient) => {
    if (error) {
      console.log(error);
    } else {
      res.render("edit.ejs", { patient: foundPatient });
    }
  });
});
//update patient
app.put("/patients/:id", (req, res) => {
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
