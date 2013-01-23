(function(Backbone,window,$,_,App) {

var views = App.views = (App.views || {});

views.Manager = {

	draw: function(questionViews) {
		_.each(questionViews,function(view,slug) {
			if (view && view.setElement  && !view.rendered) {
				if ($('#question-'+slug+' .answers').length > 1){
					var el = $('#question-'+slug+' .answers:not(:first)');
					el.prev().remove();
					el.remove();
				}
				view.setElement($('#question-'+slug+' .answers')).render(['a','b','c']).el;
				view.rendered = true;
			}
		});
	},
};

})(Backbone,window,$,_,window.App)
