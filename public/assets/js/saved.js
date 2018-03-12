
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
        console.log(data);
        
        let modalText = [
        "<div class='container-fluid text-center dialogbox'>",
        "<h4>",
        title,
        "</h4>",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
        "<br>",
        "<button class='btn btn-success save-note'>Save Note</button>",
        "</div>"
        ].join("");

        bootbox.dialog({
          message: modalText,
          closeButton: true
        });

        
        renderNotesList(data);
    })
}

var renderNotes = (data) => {
    var notesToRender = [];
    var currentNote;
    if (!data.notes.length) {
      // If we have no notes, just display a message explaing this
      currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
      notesToRender.push(currentNote);
    }
    else {
    }

}



function renderNotesList(data) {
    // This function handles rendering note list items to our notes modal
    // Setting up an array of notes to render after finished
    // Also setting up a currentNote variable to temporarily store each note
    var notesToRender = [];
    var currentNote;
    if (!data.length) {
      // If we have no notes, just display a message explaing this
      currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
      notesToRender.push(currentNote);
    }
    else {
      // If we do have notes, go through each one
      for (var i = 0; i < data.notes.length; i++) {
        // Constructs an li element to contain our noteText and a delete button
        currentNote = $(
          [
            "<li class='list-group-item note'>",
            data.notes[i].noteText,
            "<button class='btn btn-danger note-delete'>x</button>",
            "</li>"
          ].join("")
        );
        // Store the note id on the delete button for easy access when trying to delete
        currentNote.children("button").data("_id", data.notes[i]._id);
        // Adding our currentNote to the notesToRender array
        notesToRender.push(currentNote);
      }
    }
    // Now append the notesToRender to the note-container inside the note modal
    $(".note-container").append(notesToRender);
  }



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



