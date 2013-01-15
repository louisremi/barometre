(function(Backbone,window,$,_,App) {

var views = App.views =(App.views || {});

view.ConsoAnswerMonthView =Backbone.View.extend({
	template: _.template($("#bm-conso-answer-month-template").html()),
	graphSelector: ".graph-container",
	logoSelector: ".logo-conso",
	texteSelector: ".texte-conso",
	cercleSelector: ".cercle-conso",
	percentageSelector: ".percentage-conso",
	labelSelector: ".label-conso",

});

views.ConsoQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-conso-question-month-template").html()),
	answers: ["first","second","third","fourth","fifth"],

	initialize: function() {

	},

	render: function() {
		this.$el.html(this.template());
		return this;
	}
});

views.ConsoQuestionYearView = Backbone.View.extend({
	template: _.template($("#bm-conso-question-year-template").html()),

	initialize: function() {

	},

	render: function() {
		this.$el.html(this.template());
		return this;
	}
});

})(Backbone,window,$,_,window.App)