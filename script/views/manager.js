(function(Backbone,window,$,_,App) {

var views = App.views = (App.views || {});

views.Manager = {

	draw: function(questionViews) {
		_.each(questionViews,function(view,slug) {
			view.setElement($('#question-'+slug+' .answers')).render().el;
		});
	},
};

})(Backbone,window,$,_,window.App)