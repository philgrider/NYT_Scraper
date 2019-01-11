//New user form
$(function () {
    //Scrape new Stories
    $(".scrape-new").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("scrape new");
        $.ajax("/api/search", {
            type: "get"
        }).then(function (data) {
            window.location = "/";
        });
    });
    $(".clear").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("Clear Aticles");
        $.ajax("/api/clear", {
            type: "get"
        }).then(function (data) {
            window.location = "/";
        });
    });
    $(".card").on("click", ".save", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var articalId = $(this).data("id");
        $.ajax("/api/save/" + articalId, {
            type: "put",
            data: articalId
        }).then(function (data) {
            window.location = "/";
        });
    });
    $(".card").on("click", ".delete", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var articalId = $(this).data("id");
        $.ajax("/api/delete/" + articalId, {
            type: "put",
            data: articalId
        }).then(function (data) {
            window.location = "/saved";
        });
    });
    $(".card").on("click", ".notes", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var articalId = $(this).data("id");
        $("#articleNoteID").text("Notes For Article: " + articalId)
            .attr("data-id", articalId);

        $.ajax("/api/notes/" + articalId, {
            type: "get",
        }).then(function (data) {
            var noteContainer = $(".note-container");
            noteContainer.empty();
            if (data[0].note.length > 0) {
                for (var i = 0; i < data[0].note.length; i++) {
                    noteContainer.append("<li class='list-group-item note'>" + data[0].note[i].body
                        + "<button class='btn btn-danger note-delete' id='" + data[0].note[i]._id
                        + "'>x</button></li>");
                }
            } else {
                noteContainer.append("<li class='list-group-item'>No notes for this article yet.</li>");
            }
            $("#noteModal").modal("show");
        });

    });
    $(".save").on("click", function (event) {
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
        }).then(function (data) {
            console.log("clear text");
            $("#note-text").val("");
        });
    });
    $(".note-container").click(".note-delete", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log(event.target.id);
        $.ajax("/api/notedelete/" + event.target.id, {
            type: "put",
            data: event.target.id
        }).then(function (data) {
            window.location = "/saved";
        });
    });
});