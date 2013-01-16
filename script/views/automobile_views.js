(function(Backbone,window,$,_,App) {

var views = App.views =(App.views || {});

views.AutomobileQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-automobile-question-month-template").html()),

	initialize: function() {

	},
});

views.AutomobileQuestionYearView = Backbone.View.extend({
	template: _.template($("#bm-automobile-question-year-template").html()),

	initialize: function() {

	},
});

})(Backbone,window,$,_,window.App)