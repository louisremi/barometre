(function($, Backbone, _, App, window) {

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

		_.each(_.difference(App.ui.tabs["courant"],typeAvailable),function(type) {
			if (App.views.question[type]) {
				if (!App.views.question[type].rendered)
					App.views.Manager.draw([App.views.question[type]]);
				if (App.views.question[type].noData)
					App.views.question[type].noData();
			}
		});
	});

	Backbone.history.start();
};

App.ui.initialize = function() {
	var commonData = {
		years: App.ui.years,
		months: App.ui.months
	};

	$(".question").each(function() {
		var questionSlug = this.id.split("-")[1],
			data = $.extend({}, commonData, App.ui.questions[ questionSlug ] );

		$(this).html( ( _.template( $("#question-template").html() ) )( data ) );
	});

	$("#years-style")[0].styleSheet ?
		$("#years-style")[0].styleSheet.cssText = ( _.template( $("#years-style-template").html() ) )( { years: App.ui.years } ) :
		$("#years-style").html( ( _.template( $("#years-style-template").html() ) )( { years: App.ui.years } ) );
};

$(document.body).on("click", ".compare", function() {
	var self = this,
		more = this.parentNode;

	_( App.ui.years ).each(function(year) {
		if ( year != App.ui.model.get("year") ) {
			more.insertAdjacentHTML("afterend", "<iframe src='" + ( self.href ).replace(/\/20\d\d\//, "/" + year + "/") + "' frameborder=0 style='width: 100%; height: 330px;'></iframe>");
		}
	});
	more.style.display = "none";
});

})(jQuery, Backbone, _, App, window);