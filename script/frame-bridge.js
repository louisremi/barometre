(function( window, parent, html ) {

if ( window == parent ) {
	App.hashFound = window.location.hash;
	html.id = "standalone";

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

	// numbers sent from top are font-<size updates
	} else if ( e.data && !isNaN( e.data ) ) {
		document.body.style.fontSize = e.data + "px";
	}
}

})( window, window.parent, document.documentElement );