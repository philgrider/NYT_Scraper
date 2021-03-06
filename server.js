require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the database
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

module.exports = app;