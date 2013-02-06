(function($, window) {

var html = document.documentElement,
	$hiddenHandle,
	$draggedHandle,
	monthsOffsetLeft,
	monthsWidth = 530;

$(document).on("mousedown", ".handle", function() {
	var offset = $(this).offset(),
		$handle = $("<div class='handle'></div>");

	$hiddenHandle = $(this).css({display: "none"});

	$draggedHandle = $handle.appendTo(document.body)
		.css({
			display: "block",
			position: "absolute",
			top: offset.top,
			left: offset.left
		});

	monthsOffsetLeft = $(this.parentNode.parentNode).offset().left;

	return false;
});

$(document).on("mousemove", function(e) {
	if ( !$draggedHandle ) { return; }

	var x = e.clientX - 8;

	// handle cannot escape the menu
	if ( x < monthsOffsetLeft ) {
		x = monthsOffsetLeft;

	} else if ( x > monthsOffsetLeft + monthsWidth ) {
		x = monthsOffsetLeft + monthsWidth;
	}

	$draggedHandle.css({left: x});

	return false;
});

$(document).on("mouseup", function() {
	if (!$draggedHandle) { return; }

	var offset = $draggedHandle.offset(),
		a = document.elementFromPoint( offset.left + 8, offset.top + 20 - html.scrollTop );

	if ( a.nodeName == "LI" ) {
		a = a.childNodes[1];
	}

	$draggedHandle.remove();
	// there's a small delay before the handle is hidden by css,
	// so don't clear the inline style immediatly
	setTimeout(function() {
		$hiddenHandle.css({display: ""});
		$draggedHandle = $hiddenHandle = null;
	}, 50);

	window.location = a.href;
});

})(jQuery, window);