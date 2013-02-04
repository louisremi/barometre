(function($, Backbone, _, App, window) {

App.dispatcher = _.extend({}, Backbone.Events, {
	cid: "dispatcher"
});

$(function() {
	App.domLoaded = 1;
	App.initialize();
});

App.initialize = function() {

	// wait for both events before initializing the app
	if ( App.domLoaded === undefined || App.hashFound === undefined ) {
		return;
	}

	App.ui.initialize();

	App.router = new App.BarometreRouter({appView:App.view});

	App.views.links = new App.Views.Links({
		model: App.ui.model,
		el: $("#center")[0]
	});

	App.views.tabMenu = new App.Views.TabMenu({
		model: App.ui.model,
		el: $("#tab-menu")[0]
	});

	App.views.displayMenu = new App.Views.DisplayMenu({
		model: App.ui.model,
		el: $("#tabs")[0]
	});

	App.views.yearMenu = new App.Views.YearMenu({
		model: App.ui.model,
		el: $("#tabs")[0]
	});

	App.views.monthMenu = new App.Views.MonthMenu({
		model: App.ui.model,
		el: $("#tabs")[0]
	});

	App.collections.questions = new App.collections.QuestionCollection();

	App.collections.questions.bind('reset',function() {
		var typeAvailable = [];
		if (App.ui.model.get("display") === "month") {
			App.collections.questions.each(function(question) {
				if (!!App.views.question[question.get('type')] && App.views.question[question.get('type')].hookUp) {
					App.views.question[question.get('type')].hookUp(question);
					typeAvailable.push(question.get('type'));
				}
			});

		} else {
			var questionGroup = App.collections.questions.groupBy(function(question) {
				return question.get('type');
			});
			_.each(questionGroup,function(questions,type) {
				if (!!App.views.question[type] && App.views.question[type].hookUp) {
					App.views.question[type].hookUp(questions,App.ui.model.get("display") === "evolution" ? App.ui.questions[type].answerSlugs : undefined);
					typeAvailable.push(type);
				}
			});
		}

		_.each( App.ui.tabs["courant"], function(type) {
			// we have data for the question
			if ( _( typeAvailable ).indexOf( type ) !== -1 ) {
				if ( App.views.question[type] ) {
					if (!App.views.question[type].rendered)
						App.views.Manager.draw([App.views.question[type]]);
					
					if ( App.views.question[type].el ) {
						App.views.question[type].$el.children(":first").css({display: ""})
							.nextAll(":not(.year-month)").css({display: ""});
					}
				}
			
			// we don't have data for that question
			} else {
				if ( App.views.question[type] && App.views.question[type].el ) {
					App.views.question[type].$el.children(":first").css({display: "block"})
						.nextAll().css({display: "none"});
				}
			}
		});
	});

	Backbone.history.start();
};

if ( !App.ui ) {
	App.ui = {};
}

App.ui.initialize = function() {
	var commonData = {
		years: App.ui.years,
		months: App.ui.months,
		lastMonthOfYear: App.ui.lastMonthOfYear
	};

	$(".question").each(function() {
		var questionSlug = this.id.split("-")[1],
			data = $.extend({}, commonData, App.ui.questions[ questionSlug ] );

		$(this).html( ( _.template( $("#question-template").html() ) )( data ) );
	});

	$("#years-style")[0].styleSheet ?
		$("#years-style")[0].styleSheet.cssText = ( _.template( $("#years-style-template").html() ) )( { years: App.ui.years } ) :
		$("#years-style").html( ( _.template( $("#years-style-template").html() ) )( { years: App.ui.years } ) );

	$("#mois-en-cours")
		.html( App.ui.months[ App.ui.now.getMonth() + 1 ][1] + " " + App.ui.now.getFullYear() )
		.attr("data-href", ":display/courant/" + App.ui.now.getFullYear() + "/" + ( App.ui.now.getMonth() + 1 ) );
};

})(jQuery, Backbone, _, App, window);