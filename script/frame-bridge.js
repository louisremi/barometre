(function( window, parent ) {

if ( window == parent ) {
	return App.hashFound = window.location.hash;
}

parent.postMessage("hashRequest", "*");
"addEventListener" in window ?
	window.addEventListener( "message", messageHandler, false ) :
	window.attachEvent( "onmessage", messageHandler );

function messageHandler( e ) {
	// messages starting with "#" are hash updates
	if ( /^#/.test( e.data ) ) {
		App.hashFound = window.location = e.data;
		App.initialize();

	// if the message is a number, it's a font-size update
	} else if ( e.data && !isNaN( e.data ) ) {
		document.body.style.fontSize = e.data + "px";
	}
}

})( window, window.parent );