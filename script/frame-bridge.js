(function( window, parent, document ) {

if ( window == parent ) {
	App.hashFound = window.location.hash;
	document.documentElement.id = "standalone";

	return;
}

"addEventListener" in window ?
	window.addEventListener( "message", messageHandler, false ) :
	window.attachEvent( "onmessage", messageHandler, false );

// messages seem to be synchronous in IE8 :-/
// anyway it doesn't work if this message is sent before setting the event-listener
parent.postMessage("hashRequest", "*");

function messageHandler( e ) {
	if ( /^#/.test( e.data ) ) {
		App.hashFound = window.location = e.data;
		// App.initialize should not exist yet,
		// this is just in case message passing took too long
		if ( App.initialize ) {
			App.initialize();
		}

	// numbers sent from top are font-size updates
	} else if ( e.data && !isNaN( e.data ) ) {
		document.body.style.fontSize = e.data + "px";

		// send current document height to parent frame
		parent.postMessage( document.body.offsetHeight, "*" );
	}
}

})( window, window.parent, document );