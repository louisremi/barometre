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
		var groupedQuestions = App.collections.questions.groupBy(function(question) {
			return question.get('type');
		});

		_( groupedQuestions ).each(function( questions, type ) {
			if ( App.views.question[type] && App.views.question[type].hookUp ) {
				App.views.question[type].hookUp( questions, App.ui.model.get("display") === "evolution" ?
					App.ui.questions[type].answerSlugs :
					undefined
				);
			}
		});

		_( App.ui.tabs["courant"] ).each(function( type ) {
			// we have data for the question
			if ( type in groupedQuestions ) {
				if ( App.views.question[type] ) {
					if (!App.views.question[type].rendered) {
						App.views.Manager.draw([App.views.question[type]]);
					}
					
					if ( App.views.question[type].el ) {
						App.views.question[type].$el.css({opacity: ""})
							.children(":first").css({display: ""})
							.nextAll(":not(.year-month, #question-actu .answers)").css({display: ""});
					}
				}
			
			// we don't have data for that question
			} else {
				// THE CLIENT CHANGED IS MIND ONCE AGAIN
				// special case for immo and auto on "current month" tab
				/*if (
					App.ui.model.get("tab") == "courant" &&
					App.ui.model.get("display") == "month" &&
					( type == "auto" || type == "immo" )
				) {
					var tmpDate = new Date( App.ui.model.get("year"), App.ui.model.get("month") -2 );
					// fetch data from previous month
					App.collections.singleQuestion.setUrl(
						type,
						tmpDate.getFullYear(),
						( "0" + ( tmpDate.getMonth() + 1 ) ).slice(-2)
					);
					return App.collections.singleQuestion.fetch();

				// normal case: display a "no-data" message
				} else*/ if ( App.views.question[type] && App.views.question[type].el ) {
					App.views.question[type].$el.css({opacity: ""})
						.children(":first").css({display: "block"})
						.nextAll().css({display: "none"});
				}
			}
		});

		// send current document height to parent frame
		window.parent.postMessage( document.body.offsetHeight, "*" );
	});

	// view specific to immo and auto on the front page
	App.collections.singleQuestion = new App.collections.QuestionCollection();

	App.collections.singleQuestion.bind("reset", function() {
		App.collections.singleQuestion.each(function(question) {
			var view = App.views.question[question.get('type')];
			view.$el.css({opacity: ""});
			view.hookUp([question]);

			view.$el.children(".no-data, .answers").css({display: ""});

			// set specific month and year for that question
			( new App.Views.YearMenu({
				el: view.el.parentNode
			}) ).render( question.get("year") + "" );

			( new App.Views.MonthMenu({
				el: view.el.parentNode
			}) ).render( question.get("month") + "" );
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
		lastMonthOfYear: App.ui.lastMonthOfYear,
		noDataLabel: "Pas de donnée disponible pour ce mois",
		moreHref: "compare/:tab/all/:month"
	};

	$(".question").each(function() {
		var questionSlug = this.id.split("-")[1],
			data = $.extend({}, commonData, App.ui.questions[ questionSlug ] );

		data.moreHref = data.moreHref.replace( ":tab", questionSlug );

		$(this).html( ( _.template( $("#question-template").html() ) )( data ) );
	});

	$("#years-style")[0].styleSheet ?
		$("#years-style")[0].styleSheet.cssText = ( _.template( $("#years-style-template").html() ) )( { years: App.ui.years } ) :
		$("#years-style").html( ( _.template( $("#years-style-template").html() ) )( { years: App.ui.years } ) );

	// set the label of the first tab
	$("#mois-en-cours")
		.html( App.ui.months[ App.ui.now.getMonth() + 1 ][1] + " " + App.ui.now.getFullYear() )
		.attr("data-href", "month/courant/" + App.ui.now.getFullYear() + "/" + ( App.ui.now.getMonth() + 1 ) );
};

})(jQuery, Backbone, _, App, window);