( function( $ ) {
    $( document ).ready(function() {
        $(document).on("click",".editor-post-publish-button, .editor-post-publish-panel__toggle",function() {
            $('body').find("#the-list").remove();
        });
    });
} )( jQuery );