var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Arrays for data
var tables = [];

var waitList = []; //waitingList

//ROUTES

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/reserve.html"));
});
// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays current reservations
app.get("/api/waitlist", function(req, res) {
  return res.json(waitList);
});

// Create New Reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReserve = req.body;

  // Using a RegEx Pattern to remove spaces from newReserve
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  //   newReserve.routeName = newReserve.name.replace(/\s+/g, "").toLowerCase();

  // console.log(newReserve);

  tables.push(newReserve);

  res.json(newReserve);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
