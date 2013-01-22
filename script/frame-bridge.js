(function( window, parent, top, html ) {

if ( window == parent || parent != top ) {
	App.hashFound = window.location.hash;

	if ( window == parent ) {
		return;

	// parent != top
	} else {
		html.className = html.className += " child-frame";
	}
}

App.children = [];

parent.postMessage("hashRequest", "*");
"addEventListener" in window ?
	window.addEventListener( "message", messageHandler, false ) :
	window.attachEvent( "onmessage", messageHandler );

function messageHandler( e ) {
	// hashRequest is in this case a ping to identify a child frame
	if ( e.data == "hashRequest" ) {
		App.children.push( e.source );

	// messages from top starting with "#" are hash updates
	} else if ( e.source == top && /^#/.test( e.data ) ) {
		App.hashFound = window.location = e.data;
		App.initialize();

	// messages starting with / are month updates
	} else if ( /^\//.test( e.data ) ) {
		window.location = window.location.hash.replace( /\/\d+$/, e.data );

	// numbers sent from top are font-<size updates
	} else if ( e.source == top && e.data && !isNaN( e.data ) ) {
		document.body.style.fontSize = e.data + "px";
	}
}

})( window, window.parent, window.top, document.documentElement );