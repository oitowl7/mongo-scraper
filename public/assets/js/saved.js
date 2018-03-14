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
        url: "/saved/deletesaved/" + id
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
        console.log(data);
        for (var i = 0; i < data[0].note.length; i++) {
            currentNote = [
                `<li class="list-group-item note">`,
                data[0].note[i].body,
                `</li>`,
                `<button class='btn btn-danger note-delete' onclick="deleteNote('${data[0].note[i]._id}', '${i}')">Delete</button>`
            ].join("");
            notesToRender.push(currentNote);
        }

    }
    $(".note-container").append(notesToRender);
}

var deleteNote = (id, index) => {
    console.log(id)
    $.ajax({
        type: "DELETE",
        url: 'saved/deletenote/' + id
    }).then(data => {
        console.log(data);
        bootbox.hideAll();
    })
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