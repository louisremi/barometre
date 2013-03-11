(function(Backbone,window,$,_,App) {

var views = App.views = (App.views || {});

views.Manager = {

	draw: function(questionViews) {
		_.each(questionViews,function(view,slug) {
			var el;

			if (view && view.setElement) {
				if ($('#question-'+slug+' .answers').length > 1){
					el = $('#question-'+slug+' .answers:not(:first)');
					el.prev().remove();
					el.remove();
				}
				if (!view.rendered) {
					// hide tthe view temporarily while there are no data
					el = $('#question-'+slug+' .visualization').css({opacity: "0"});

					view.setElement( el ).render(['a','b','c']);
					view.rendered = true;
				}
			}
		});
	}
};

})(Backbone,window,$,_,window.App);
