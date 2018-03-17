
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

    $("#fetch-nav").on("click", () => {
        $.ajax({
            type: "GET",
            url: "/fetch"
        }).done(data => {
            console.log(data);
            location.reload();
        })
        displayLoaderBootbox();
    })
});

var saveArticle = (id) => {
    console.log(id);
    $.ajax({
        type:"PUT",
        url: "/save/" + id
    }).done(data => {
        console.log(data);
        location.reload();
    })
}

$(".search-btn").on("click", (event) => {
    $.ajax({
        type: "GET",
        url: '/search/' + $("#search-field").val().trim()
    }).done(data => {
        console.log("done");
    })
})

var displayLoaderBootbox = () => {
    console.log("This happened as the ajax request is being made");
    
}