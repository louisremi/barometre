(function( window, parent, document ) {

if ( window == parent ) {
	App.hashFound = window.location.hash;
	document.documentElement.id = "standalone";

	return;
}

parent.postMessage("hashRequest", "*");
"addEventListener" in window ?
	window.addEventListener( "message", messageHandler, false ) :
	window.attachEvent( "onmessage", messageHandler );

function messageHandler( e ) {
	if ( /^#/.test( e.data ) ) {
		App.hashFound = window.location = e.data;
		App.initialize();

	// numbers sent from top are font-size updates
	} else if ( e.data && !isNaN( e.data ) ) {
		document.body.style.fontSize = e.data + "px";

		// send current document height to parent frame
		parent.postMessage( document.body.offsetHeight, "*" );
	}
}

})( window, window.parent, document );