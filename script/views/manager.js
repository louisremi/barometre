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
					view.compare =false;
					view.compareViews = new Array(2);
					view.questionsCompareCollection = new Array(2);
				}
				if (!view.rendered) {
					view.setElement($('#question-'+slug+' .answers')).render(['a','b','c']).el;
					view.rendered = true;
				}
			}
		});
	},
};

})(Backbone,window,$,_,window.App);
