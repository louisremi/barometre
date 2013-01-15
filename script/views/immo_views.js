(function(Backbone,window,$,_,App) {

var views = App.views =(App.views || {});

views.ImmoQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-immo-question-month-template").html()),

	initialize: function() {

	},
});

views.ImmoQuestionYearView = Backbone.View.extend({
	template: _.template($("#bm-immo-question-year-template").html()),

	initialize: function() {

	},
});

})(Backbone,window,$,_,window.App)