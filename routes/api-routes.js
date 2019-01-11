var db = require("../models");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
module.exports = function(app) {
  //Get all sellers
  app.get("/api/search", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.nytimes.com").then(function(response) {
    //   // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      var result = {};
      // console.log(response);
    //   // Now, we grab every h2 within an article tag, and do the following:
      $(".css-6p6lnl").each(function(i, element) {
               // Save an empty result object
                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                .children("a")
                .children("div")
                .children('h2')
                .text();
              // console.log(result.title);
              result.link = $(this)
                .children("a")
                .attr("href");
                result.link = "https://www.nytimes.com" + result.link;
                // console.log(result.link);
                result.text = $(this)
                .children("a")
                .children("p")
                .text();
                if(result.text.length === 0) {
                  result.text = $(this)
                  .children("a")
                  .children("ul")
                  .children("li")
                  .text();
                  console.log("results: ",result.text.length);
                };  
                result.saveStat = false;
                console.log("added database");
                db.Article.create(result)
                .then(function(dbArticle) {  
                  res.json(dbArticle);    
                })
                .catch(function(err) {
                  // If an error occurred, log it
                  //console.log(err);
                });
        // Create a new Article using the `result` object built from scraping
    });
  });
});

  //Login
  app.get("/api/clear", function(req, res) {
    db.Article.deleteMany({})
    .then(function(dbArticle) {
      //     // View the added result in the console
      res.json(dbArticle);             
        })
      .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
      });
  });

  app.put("/api/save/:id", function(req, res) {
    // console.log(req.params.id);
    db.Article.updateOne({ _id: req.params.id },{"$set":{"saveStat":true}})
    .then( function(Articledb) {
      res.json(Articledb);
    }) 
    .catch(function(err) {
      // If an error occurred, log it
      console.log(err);
  });
  });
  app.put("/api/delete/:id", function(req, res) {
    // console.log(req.params.id);

    db.Article.deleteOne({ _id: req.params.id })
    .then( function(Articledb) {
      res.json(Articledb);
    }) 
    .catch(function(err) {
      // If an error occurred, log it
      console.log(err);
  });
  });
  app.post("/api/note/:id", function(req, res) {
    // console.log(req.params.id);
    db.Note.create(req.body)
    .then( function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id },{$push: { note: dbNote._id }}, {new: true});
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    }) 
    .catch(function(err) {
      // If an error occurred, log it
      // console.log(err);
  });
  });


};
