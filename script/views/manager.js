(function(Backbone,window,$,_,App) {

var views = App.views = (App.views || {});

views.Manager = {

	draw: function(questionViews) {
		_.each(questionViews,function(view,slug) {
			if (view.setElement)
				view.setElement($('#question-'+slug+' .answers')).render(['a','b','c']).el;
		});
	},
};

})(Backbone,window,$,_,window.App)