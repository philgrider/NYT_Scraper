var db = require("../models");
var mongoose = require("mongoose");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/nytarticles", { useNewUrlParser: true });

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {

    db.Article.find()
    .then(function(dbArticle) {
    res.render("index", {
     article: dbArticle
    });     
    })
    .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
    });
  });
    app.get("/saved", function(req, res) {

      db.Article.find()
      .then(function(dbArticle) {
      res.render("saved", {
       article: dbArticle
        });
      }) 
      .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
      });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
