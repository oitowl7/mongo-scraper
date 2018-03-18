$(function () {
    // Remove Search if user Resets Form or hits Escape!
    $('body, .navbar-collapse form[role="search"] button[type="reset"]').on('click keyup', function(event) {
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
    $.ajax({
        type:"PUT",
        url: "/saved/deletesaved/" + id
    }).done(data => {
        location.reload();
    })
}

// creates modal for the article notes to be rendered to. existing notes are not rendered here
var articleNotes = (id, title) => {
    $.ajax({
        type: "GET",
        url: "/api/notes/" + id
    }).done( data => {
        const modalText = [
        "<div class='container-fluid text-center dialogbox'>",
        "<h4>",
        title,
        "</h4>",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea class='text-area' placeholder='New Note' rows='4' cols='60' id='note-to-store'></textarea>",
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

// existing notes are rendered here and appended to the modal made above
var renderNotes = (data) => {
    var notesToRender = [];
    var currentNote;
    if (!data[0].note.length) {
      // If we have no notes, put one empty "div" explaining that we have none
      currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
      notesToRender.push(currentNote);
    } else {
        for (var i = 0; i < data[0].note.length; i++) {
            currentNote = [
                `<li class="list-group-item note">`,
                `<div class="note-body">`,
                data[0].note[i].body,
                `</div>`,
                `<button class='btn btn-danger note-delete' onclick="deleteNote('${data[0].note[i]._id}', '${i}')">Delete</button>`,
                `</li>`
            ].join("");
            notesToRender.push(currentNote);
        }

    }
    $(".note-container").append(notesToRender);
}

var deleteNote = (id, index) => {
    $.ajax({
        type: "DELETE",
        url: 'saved/deletenote/' + id
    }).then(data => {
        bootbox.hideAll();
    })
}

// saves and reloads the page after ajax call is answered
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
            bootbox.hideAll();
        })
    }
}