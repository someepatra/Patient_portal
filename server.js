//dependencies
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
//const Patient = require("./models/patient_schema.js/index.j");
const session = require("express-session");
const app = express();
const db = mongoose.connection;

//port
const port = 3000;

//controller
const patient = require("./controller/patient.js");
const symptoms = require("./controller/symptoms.js");
const usersController = require("./controller/users.js");
const sessionsController = require("./controller/sessions.js");

//Middleware
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "niceidea", //some random string
    resave: false,
    saveUninitialized: false
  })
);
app.use("/patients", patient);
app.use("/symptoms", symptoms);
app.use("/users", usersController);
app.use("/sessions", sessionsController);

//connect mongo db
mongoose.connect("mongodb://localhost:27017/patient_portals", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// //sessions
app.get("/", (req, res) => {
  //console.log(req.session);
  res.render("login.ejs", { currentUser: req.session.currentUser });
});
//sessions

//port listen
app.listen(port, () => {
  console.log("listening on port", port);
});

// //new
// app.get("/patients/new", (req, res) => {
//   res.render("new.ejs");
// });
// //index show all patients
// app.get("/patients", (req, res) => {
//   Patient.find({}, (error, allPatients) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.render("index.ejs", { patient: allPatients });
//     }
//   });
// });
// //create
// app.post("/patients", (req, res) => {
//   if (req.body.check_insurance === "on") {
//     req.body.check_insurance = true;
//   } else {
//     req.body.check_insurance = false;
//     req.body.insurance = "None";
//     req.body.co_pay = 100;
//   }
//   Patient.create(req.body, (error, createdPatient) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.redirect("/patients");
//     }
//   });
// });

// //show by patinet
// app.get("/patients/:id", (req, res) => {
//   Patient.findById(req.params.id, (error, foundPatient) => {
//     res.render("shows.ejs", { patient: foundPatient });
//   });
// });
// //delete patient data
// app.delete("/patients/:id", (req, res) => {
//   Patient.findByIdAndRemove(req.params.id, () => {
//     res.redirect("/patients");
//   });
// });
// //edit a ptient data
// app.get("/patients/:id/edit", (req, res) => {
//   Patient.findById(req.params.id, (error, foundPatient) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.render("edit.ejs", { patient: foundPatient });
//     }
//   });
// });
// //update patient
// app.put("/patients/:id", (req, res) => {
//   Patient.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err, updatedPatient) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.redirect("/patients");
//       }
//     }
//   );
// });
