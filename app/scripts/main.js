// 1. Get reference to button
// 2. Add click event to button
// 3. Get template
// -- Compile Template with Handlebars
// 4. Get People
// -- Pass people object to Handlebars template for compilation
// 5. Render


var $container  = $( "#content" ),
    $button     = $( "#button" )
;

var View = {

    get: function( url ) {
        
        return $.ajax( url ).promise();
    },

    render: function( template_url, json_url ) {

        var deferred = $.Deferred(),
            self = this
        ;

        // Getting template, json and compiling.
        $.when( self.get( template_url ), self.get( json_url ) ).then( function( templateResp, jsonResp ) {
            
            var template = Handlebars.compile( templateResp[0] ),
                people = template( jsonResp[0] )
            ;

            deferred.resolve( { people: people, msg: "success" } );

        }).fail( function( err ){

            deferred.resolve( "Your Friend's hate you" );

        });


        return deferred.promise();

    }

};


$button.on( "click", function(){

    // Render People
    $.when( View.render( "scripts/templates/people.htm", "people.json" ) ).done( function( obj ) {
        
        $container.html( obj.people );

    });

});








