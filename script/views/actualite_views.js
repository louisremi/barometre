(function(Backbone,window,$,_,App) {

var views = App.views =(App.views || {});

views.ActualiteQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-actualite-question-month-template").html()),

	initialize: function() {

	},
});

views.ActualiteQuestionYearView = Backbone.View.extend({
	template: _.template($("#bm-actualite-question-year-template").html()),

	initialize: function() {

	},
});

})(Backbone,window,$,_,window.App)