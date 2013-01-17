(function( window, Backbone, App ) {

	// The idea is to use a model to store the state of the UI,
	// because we won't systematically redraw the UI on each click
	var BarometreRouter = Backbone.Router.extend({

		questionViews: {},

		initialize: function(options) {
			var self= this;

			var model = this.model = App.ui.model = new Backbone.Model({
				display: null,
				tab: null,
				year: null,
				month: null
			});

			// we use a model as a router because we want to now what changed
			model.on("change", function() {
				App.dispatcher.trigger("routeChanged");

				if ( model.hasChanged("display") ) {
					App.dispatcher.trigger("displayChanged");
				}

				if ( model.hasChanged("tab") ) {
					App.dispatcher.trigger("tabChanged");
				}

				if ( model.hasChanged("year") ) {
					App.dispatcher.trigger("yearChanged");
				}

				if ( model.hasChanged("month") ) {
					App.dispatcher.trigger("monthChanged");
				}

				if ( model.hasChanged("display") ) {
					// supprimer toutes le contenu des .question
					// trouver quel mode de display.
					// pour chaque type question on doit retrouver quelle objet vue correpond a ce mode de display

					$('.answers').empty();

					_.each(App.ui.tabs[model.get('tab')],function(value) {
						self.questionViews[value] = new (App.ui.questions[value].display[model.get('display')])({type:value});
					});

					App.views.Manager.draw(self.questionViews);

				} else if ( model.hasChanged("tab") ) {
					//App.ui.selectTab();

				} else if ( model.hasChanged("year") || model.hasChanged("month") ) {
					// I don't know, find something to do!

				}

				App.collections.questions = new App.collections.QuestionCollection();
				App.collections.questions.setUrl(
					App.ui.tabs[self.model.get("tab")].join("/"),
					self.model.get("year"),
					("0"+self.model.get("month")).slice(-2)
				);
				App.collections.questions.fetch();

				App.collections.questions.bind('add',function() {
					App.collections.questions.each(function(question) {
					if (!!self.questionViews[question.get('type')])
						self.questionViews[question.get('type')].hookUp(question);
					})
				});

				App.collections.questions.bind('reset',function() {
					App.collections.questions.each(function(question) {
					if (!!self.questionViews[question.get('type')] && self.questionViews[question.get('type')].hookUp)
						self.questionViews[question.get('type')].hookUp(question);
					})
				});
			});
		},

		routes: {
			"": "barometre",
			"bm/:display/:tab/:year/(:month)": "barometre"
		},

		barometre: function( display, tab, year, month ) {
			if ( !display ) {
				this.model.set({
					display: "month",
					tab: "courant",
					year: App.ui.now.getFullYear(),
					month: ( "0" + App.ui.now.getMonth() ).slice(-2)
				});
			} else {
				this.model.set({
					display: display,
					tab: tab,
					year: year,
					month: month || ""
				});
			}

			// proxy url to parent frame
			window.parent.postMessage( window.location.hash + "", "*" );
		}
	});

	window.App.BarometreRouter = BarometreRouter;

})( window, Backbone, App );