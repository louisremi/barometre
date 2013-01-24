(function( window ) {

var iframe,
	barometre,
	prefix = "addEventListener" in window ?
		"" :
		"on",
	_addEventListener = prefix ?
		"attachEvent" :
		"addEventListener",
	fontSize = 16;

window[ _addEventListener ]( prefix + "message", messageHandler, false );
window[ _addEventListener ]( prefix + "mouseup", zoomHandler, false );

function messageHandler( e ) {
	if ( e.data == "hashRequest" ) {
		barometre = e.source;
		iframe = document.getElementById("frame-barometre");

		e.source.postMessage( ( window.location.hash || "#" ) + "", "*" );

	// messages starting with "#" are hash updates
	} else if ( /^#/.test( e.data ) ) {
		window.location = e.data;
	
	// numbers are height updates
	} else if ( e.data && !isNaN( e.data ) ) {
		iframe.style.height = e.data + "px";
		iframe.parentNode.parentNode.style.height = e.data + "px";
	}
}

function zoomHandler( event ) {
	if ( !event ) {
		event = window.event;
	}
	var target = event.target || event.srcElement,
		name;

	if ( target.nodeName != "A" || ! /^zoom/.test( name = target.className ) ) {
		return;
	}

	barometre.postMessage( name == "zoomPlus" ?
		++fontSize :
		--fontSize,
	"*" );
}

})( window );