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
      app.put("/api/notes/:id", function(req, res) {
        console.log("modal ID " + req.params.id)
        db.Article.find({_id: req.params.id})
        .populate("note")
        .then(function(noteDb) {
          selectNotesDB = JSON.stringify(noteDb);
          // console.log("Note DB: " + noteDb[0].note);
          res.render("partials/modal" ,{
            note: noteDb[0].note
          })
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
