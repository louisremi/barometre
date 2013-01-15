(function(Backbone,window,$,_,App) {

var views = App.views =(App.views || {});

views.EpargneQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-epargne-question-month-template").html()),

	initialize: function() {

	},
});

views.EpargneQuestionYearView = Backbone.View.extend({
	template: _.template($("#bm-epargne-question-year-template").html()),

	initialize: function() {

	},
});

})(Backbone,window,$,_,window.App)