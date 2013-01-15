(function(Backbone,window,$,_,App) {

var views = App.views =(App.views || {});

views.ConsocouranteQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-consocourante-question-month-template").html()),

	initialize: function() {

	},
});

views.ConsocouranteQuestionYearView = Backbone.View.extend({
	template: _.template($("#bm-consocourante-question-year-template").html()),

	initialize: function() {

	},
});

})(Backbone,window,$,_,window.App)