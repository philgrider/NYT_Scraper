//New user form
$(function() {
    //Scrape new Stories
$(".scrape-new").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
    console.log("scrape new");
    $.ajax("/api/search", {
        type: "get"
      }).then(function(data) {
        window.location = "/";
        });
    });
$(".clear").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("Clear Aticles");
    $.ajax("/api/clear", {
        type: "get"
      }).then(function(data) {
        window.location = "/";
        });
    });
    $(".card").on("click", ".save", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var articalId = $(this).data("id");
        // console.log(articalId);
        $.ajax("/api/save/" + articalId, {
            type: "put",
            data: articalId
          }).then(function(data) {
            window.location = "/";
            });
        });
    $(".card").on("click", ".delete", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var articalId = $(this).data("id");
        // console.log(articalId);
        $.ajax("/api/delete/" + articalId, {
            type: "put",
            data: articalId
            }).then(function(data) {
            window.location = "/saved";
            });
        });
    $(".card").on("click", ".notes", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var articalId = $(this).data("id");
        console.log("modal go " + articalId);
        $("#articleNoteID").text("Notes For Article: " + articalId).attr("data-id", articalId);

        $.ajax("/api/notes/" + articalId, {
            type: "put",
          }).then(function(data) {
            });
        $("#noteModal").modal("show");
        
         // console.log(articalId);

});
    $(".save").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var articalId = $("#articleNoteID").attr("data-id");
        console.log("save note go ", articalId);
        $("#noteModal").modal("hide");
        
        $.ajax("/api/note/" + articalId, {
            type: "POST",
            data: {
                // Value taken from note textarea
                body: $("textarea").val()
            }
        }).then(function(data) {
            $("#textarea").empty();
            });
    });
});