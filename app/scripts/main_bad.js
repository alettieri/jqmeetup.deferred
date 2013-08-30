var $container  = $( '#content' ),
    $button     = $( '#button' )
;



function g(url, cb) {
    return $.ajax( { 

        url: url,
        
        success: function( data ) {
            cb( data );
        }

    } );
}


function render( template, json_url, cb ) {
    
    g( template, function( data ) {
        
            var templateHtml = Handlebars.compile( data );
            
            g( json_url, function( json ) {
                cb( templateHtml( json ) );
            });
         
    });

}

$button.on( 'click', function() {
    render( "scripts/templates/people.htm", "people.json", function( template ) {
        $container.html( template );
    } );
});