//dependencies
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const app = express();
const db = mongoose.connection;

//port
const PORT = process.env.PORT || 3000;

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
// mongoose.connect("mongodb://localhost:27017/patient_portals", {
//   useNewUrlParser: true
// });
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/patient_potals";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log("connected to mongo database");
});
// mongoose.connection.once("open", () => {
//   console.log("connected to mongo");
// });
//sessions
app.get("/", (req, res) => {
  //console.log(req.session);
  res.render("login.ejs", { currentUser: req.session.currentUser });
});

//port listen
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
