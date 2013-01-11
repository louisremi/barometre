(function($, window) {

var $hiddenHandle,
	$draggedHandle,
	monthsOffsetLeft,
	monthsWidth = 540;

$(document).on("mousedown", ".handle", function() {
	var offset = $(this).offset(),
		$handle = $("<div class='handle'></div>");

	$hiddenHandle = $(this).css({display: "none"});
	
	$draggedHandle = $handle.appendTo(document.body)
		.css({
			display: "block",
			top: offset.top,
			left: offset.left
		});

	monthsOffsetLeft = $(this.parentNode.parentNode).offset().left;

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
});

$(document).on("mouseup", function() {
	if (!$draggedHandle) { return; }

	var offset = $draggedHandle.offset(),
		a = document.elementFromPoint( offset.left + 8, offset.top + 20 );

	$draggedHandle.remove();
	$hiddenHandle.css({display: ""});
	$draggedHandle = $hiddenHandle = null;

	a.click();
});

})(jQuery, window);