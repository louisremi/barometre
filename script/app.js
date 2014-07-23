(function($, Backbone, _, App, window) {

App.dispatcher = _.extend({}, Backbone.Events, {
	cid: "dispatcher"
});

if ( !App.ui ) {
	App.ui = {};
}

var now = new Date();
$.get( App.backendUrl + "/date/" + now.getFullYear() + "/", parseResponseDate);

function parseResponseDate( response ) {
	if ( !response.length ) {
		return $.get( App.backendUrl + "/date/" + ( now.getFullYear() - 1 ) + "/", parseResponseDate);
	}

	// for some reason months aren't ordered by month number
	response = _.sortBy( response, function( obj ) { return obj.month; });

	var i = response.length,
		date,
		time;

	while ( i-- ) {
		if ( response[i].answers[0].value !== "" ) {
			date = response[i].answers[0].value.split("/");
			time = response[i].answers[1].value.split(":");

			var tmp = new Date(date[2], +(date[1]) -1,date[0],time[0]);

			if ( +(new Date()) > +tmp ) {
				App.ui.now = new Date( response[i].year, response[i].month -1, 1 );

				var currentYear = App.ui.now.getFullYear(),
					firstYear = 2011,
					j = 0;

				App.ui.years = [];
				App.ui.lastMonthOfYear = [];
				while ( firstYear + j <= currentYear ) {
					App.ui.years[j] = firstYear + j;
					App.ui.lastMonthOfYear[j] = 12;
					j++;
				}

				App.ui.lastMonthOfYear[ App.ui.years.length - 1 ] = App.ui.now.getMonth() + 1;

				App.initialize();

				break;
			}
		}
	}
}

$(function() {
	App.domLoaded = 1;
	App.initialize();
});

App.initialize = function() {

	// wait for both events before initializing the app
	if ( App.domLoaded === undefined || App.hashFound === undefined || App.ui.now === undefined ) {
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
			}),
			evolutionDisplay = App.ui.model.get("display") === "evolution";

		_( groupedQuestions ).each(function( questions, type ) {
			if ( App.views.question[type] && App.views.question[type].hookUp ) {

				evolutionDisplay ?
					setTimeout(function(){
						App.views.question[type].hookUp( questions, App.ui.questions[type].answerSlugs );
					}, 50 ) :
					App.views.question[type].hookUp( questions );
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
		evolutionDisplay ?
			setTimeout(function(){
				window.parent.postMessage( document.body.offsetHeight, "*" );
			}, 100 ) :
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

App.ui.initialize = function() {

	var commonData = {
			noDataLabel: "Pas de donnée disponible pour ce mois",
			moreHref: "compare/:tab/all/:month"
		},
		questionTemplate = _.template( $("#question-template").html() ),
		menusTemplate = _.template( $("#menus-template").html() );

	$(".menus").each(function() {
		var questionSlug = this.parentNode.id.split("-")[1],
			data = $.extend({}, {
				years: App.ui.years,
				months: App.ui.months,
				lastMonthOfYear: App.ui.lastMonthOfYear,
				currentYear: App.ui.now.getFullYear(),
				currentMonth: App.ui.now.getMonth() + 1
			}, App.ui.questions[ questionSlug ] );

		$(this).html( menusTemplate( data ) );
	});

	$(".question").each(function() {
		var questionSlug = this.id.split("-")[1],
			data = $.extend({}, commonData, App.ui.questions[ questionSlug ] );

		data.moreHref = data.moreHref.replace( ":tab", questionSlug );

		$(this).html( questionTemplate( data ) );
	});

	$("#years-style")[0].styleSheet ?
		$("#years-style")[0].styleSheet.cssText = ( _.template( $("#years-style-template").html() ) )( { years: App.ui.years } ) :
		$("#years-style").html( ( _.template( $("#years-style-template").html() ) )( { years: App.ui.years } ) );

	// set the label of the first tab
	$("#mois-en-cours")
		.html( App.ui.months[ App.ui.now.getMonth() + 1 ][1] + " " + App.ui.now.getFullYear() )
		.attr("data-href", "month/courant/" + App.ui.now.getFullYear() + "/" + ( App.ui.now.getMonth() + 1 ) );

	$(document).on("change", ".menus select", function() {
		var $wrapper = $(this).closest("div"),
			$yearSelect = $wrapper.find(".year-select"),
			$monthSelect = $wrapper.find(".month-select"),
			$a = $wrapper.children("a");

		$a.attr("href",
			"#bm/" + $a.data("href")
				.replace(":tab", App.ui.model.get("tab") )
				.replace(":year", $yearSelect.val() )
				.replace(":month", $monthSelect.val() || App.ui.model.get("month") )
		);
	});

	$(document).on("change", ".month-display .year-select", function() {
		var selectedYear = $(this).val(),
			$wrapper = $(this).closest("div"),
			$monthSelect = $wrapper.find(".month-select"),
			question = $wrapper.closest(".tab")[0].id.split("-")[1],
			currentYear = App.ui.now.getFullYear(),
			currentMonth = App.ui.now.getMonth() + 1,
			empty = App.ui.empty,
			html = "",
			month;

		for ( month in App.ui.months ) {
			if (
				( selectedYear == currentYear && month > currentMonth ) ||
				( empty && empty[question] && empty[question][selectedYear] && empty[question][selectedYear].indexOf(","+ month +",") != - 1 ) ||
				( selectedYear > 2012 && question == "immo" && +month % 2 === 0 ) ||
				( selectedYear > 2012 && question == "auto" && +month % 2 === 1 )
			) {

			} else {
				html += "<option value='"+ month +"'>" + App.ui.months[month][1] + "</option>";
			}
		}

		$monthSelect.html( html ).trigger("change");
	});
};

})(jQuery, Backbone, _, App, window);
