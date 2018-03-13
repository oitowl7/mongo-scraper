$(function () {
    // Remove Search if user Resets Form or hits Escape!
    $('body, .navbar-collapse form[role="search"] button[type="reset"]').on('click keyup', function(event) {
        // console.log(event.currentTarget);
        if (event.which == 27 && $('.navbar-collapse form[role="search"]').hasClass('active') ||
            $(event.currentTarget).attr('type') == 'reset') {
            closeSearch();
        }
    });

    function closeSearch() {
        var $form = $('.navbar-collapse form[role="search"].active')
        $form.find('input').val('');
        $form.removeClass('active');
    }

    // Show Search if form is not active // event.preventDefault() is important, this prevents the form from submitting
    $(document).on('click', '.navbar-collapse form[role="search"]:not(.active) button[type="submit"]', function(event) {
        event.preventDefault();
        var $form = $(this).closest('form'),
            $input = $form.find('input');
        $form.addClass('active');
        $input.focus();

    });
    // ONLY FOR DEMO // Please use $('form').submit(function(event)) to track from submission
    // if your form is ajax remember to call `closeSearch()` to close the search container
    $(document).on('click', '.navbar-collapse form[role="search"].active button[type="submit"]', function(event) {
        event.preventDefault();
        var $form = $(this).closest('form'),
            $input = $form.find('input');
        $('#showSearchTerm').text($input.val());
        closeSearch()
    });
});

var deleteArticle = id => {
    console.log(id);
    $.ajax({
        type:"PUT",
        url: "/saved/delete/" + id
    }).done(data => {
        console.log(data);
        location.reload();
    })
}

var articleNotes = (id, title) => {
    console.log(id);
    console.log(title);
    $.ajax({
        type: "GET",
        url: "/api/notes/" + id
    }).done( data => {
        let modalText = [
        "<div class='container-fluid text-center dialogbox'>",
        "<h4>",
        title,
        "</h4>",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea placeholder='New Note' rows='4' cols='60' id='note-to-store'></textarea>",
        "<br>",
        `<button class='btn btn-success save-note' onclick="saveNote('${id}')">Save Note</button>`,
        "</div>"
        ].join("");

        bootbox.dialog({
          message: modalText,
          closeButton: true
        });

        
        renderNotes(data);
    })
}

var renderNotes = (data) => {
    console.log(data);
    var notesToRender = [];
    var currentNote;
    // console.log(data[0].title);
    if (!data[0].note.length) {
        console.log("if happened")
      // If we have no notes, just display a message explaing this
      console.log("this happened");
      currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
    } else {
        console.log("else happened");
        for (var i = 0; i < data[0].note.length; i++) {
            currentNote = [
                `<li class="list-group-item note">`,
                data[0].note[i].body,
                `</li>`,
                `<button class='btn btn-danger note-delete' onclick="deleteNote('${data._id}', '${i}'")>Delete</button>`
            ].join("");
            notesToRender.push(currentNote);
        }

    }
    $(".note-container").append(notesToRender);
}

var deleteNote = (id, index) => {

}


var saveNote = (id) => {
    var newNote = $("#note-to-store").val().trim();
    if (newNote) {
        var noteToStore = {
            ref: id,
            body: newNote
        }
        $.ajax({
            type: "POST",
            url: "/saved/newnote/" + id,
            data: noteToStore
        }).then((data) => {
            console.log("note stores");
            console.log(data);
            bootbox.hideAll();
        })
    }
}


// function handleNoteSave() {
//     // This function handles what happens when a user tries to save a new note for an article
//     // Setting a variable to hold some formatted data about our note,
//     // grabbing the note typed into the input box
//     var noteData;
//     var newNote = $(".bootbox-body textarea").val().trim();
//     // If we actually have data typed into the note input field, format it
//     // and post it to the "/api/notes" route and send the formatted noteData as well
//     if (newNote) {
//       noteData = {
//         _id: $(this).data("article")._id,
//         noteText: newNote
//       };
//       $.post("/api/notes", noteData).then(function() {
//         // When complete, close the modal
//         bootbox.hideAll();
//       });
//     }
//   }


// function renderNotesList(data) {
//     // This function handles rendering note list items to our notes modal
//     // Setting up an array of notes to render after finished
//     // Also setting up a currentNote variable to temporarily store each note
//     var notesToRender = [];
//     var currentNote;
//     if (!data.note.length) {
//       // If we have no notes, just display a message explaing this
//       currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
//       notesToRender.push(currentNote);
//     }
//     else {
//       // If we do have notes, go through each one
//       for (var i = 0; i < data.notes.length; i++) {
//         // Constructs an li element to contain our noteText and a delete button
//         currentNote = $(
//           [
//             "<li class='list-group-item note'>",
//             data.notes[i].noteText,
//             "<button class='btn btn-danger note-delete'>x</button>",
//             "</li>"
//           ].join("")
//         );
//         // Store the note id on the delete button for easy access when trying to delete
//         currentNote.children("button").data("_id", data.notes[i]._id);
//         // Adding our currentNote to the notesToRender array
//         notesToRender.push(currentNote);
//       }
//     }
//     // Now append the notesToRender to the note-container inside the note modal
//     $(".note-container").append(notesToRender);
//   }



// function handleArticleNotes() {
//     // Grab any notes with this headline/article id
//     $.get("/api/notes/" + currentArticle._id).then(function(data) {
//       // Constructing our initial HTML to add to the notes modal
//       var modalText = [
//         "<div class='container-fluid text-center'>",
//         "<h4>Notes For Article: ",
//         currentArticle._id,
//         "</h4>",
//         "<hr />",
//         "<ul class='list-group note-container'>",
//         "</ul>",
//         "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
//         "<button class='btn btn-success save'>Save Note</button>",
//         "</div>"
//       ].join("");
//       // Adding the formatted HTML to the note modal
//       bootbox.dialog({
//         message: modalText,
//         closeButton: true
//       });
//       var noteData = {
//         _id: currentArticle._id,
//         notes: data || []
//       };
//       // Adding some information about the article and article notes to the save button for easy access
//       // When trying to add a new note
//       $(".btn.save").data("article", noteData);
//       // renderNotesList will populate the actual note HTML inside of the modal we just created/opened
//       renderNotesList(noteData);
//     });
//   }



