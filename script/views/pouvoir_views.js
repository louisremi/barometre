(function(Backbone,window,$,_,App) {

var views = App.views =(App.views || {});

views.PouvoirQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-pouvoir-question-month-template").html()),

	initialize: function() {

	},
});

views.PouvoirQuestionYearView = Backbone.View.extend({
	template: _.template($("#bm-pouvoir-question-year-template").html()),

	initialize: function() {

	},
});

})(Backbone,window,$,_,window.App)