(function(Backbone,window,$,_,App) {

var views = App.views = (App.views || {});

views.Manager = {

	draw: function(questionViews) {
		_.each(questionViews,function(view,slug) {
			if (view && view.setElement) {
				if ($('#question-'+slug+' .answers').length > 1){
					var el = $('#question-'+slug+' .answers:not(:first)');
					el.prev().remove();
					el.remove();
				}
				if (!view.rendered) {
					view.setElement($('#question-'+slug+' .visualization')).render(['a','b','c']);
					view.rendered = true;
				}
			}
		});
	}
};

})(Backbone,window,$,_,window.App);
