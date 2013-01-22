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

			App.collections.questions = new App.collections.QuestionCollection();

			App.collections.questions.bind('reset',function() {
				var typeAvailable = [];
				if (self.model.get("display") === "month") {
					App.collections.questions.each(function(question) {
						if (!!self.questionViews[question.get('type')] && self.questionViews[question.get('type')].hookUp) {
							self.questionViews[question.get('type')].hookUp(question);
							typeAvailable.push(question.get('type'));
						}
					})
				} else {
					var questionGroup = App.collections.questions.groupBy(function(question) {return question.get('type')});
					_.each(questionGroup,function(questions,type) {
						if (!!self.questionViews[type] && self.questionViews[type].hookUp) {
							self.questionViews[type].hookUp(questions,self.model.get("display") === "evolution" ? App.ui.questions[type].answerSlugs : undefined);
							typeAvailable.push(type);
						}
					})
				}

				_.each(_.difference(App.ui.tabs["courant"],typeAvailable),function(type) {
					if (self.questionViews[type])
						self.questionViews[type].noData();
				});
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

					// update children on month update
					if ( App.children && App.children.length ) {
						_( App.children ).each(function(child) {
							child.postMessage("/" + model.get("month"), "*");
						});
					}
				}

				if ( model.hasChanged("display") || model.hasChanged("tab") ) {
					_.each(App.ui.tabs[ model.get("tab") ],function(value) {
						if((!self.questionViews[value] && model.hasChanged("tab")) || model.hasChanged("display")) {
							self.questionViews[value] = new (App.ui.questions[value].display[model.get('display')])({type:value});
						}
					});

					App.views.Manager.draw(self.questionViews);
				}

				App.collections.questions.setUrl(
					App.ui.tabs[self.model.get("tab")].join("/"),
					self.model.get("year"),
					(self.model.get("display") == "month" ? "0"+self.model.get("month") : "").slice(-2)
				);
				App.collections.questions.fetch();
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
					month: ( "0" + ( App.ui.now.getMonth() + 1 ) ).slice(-2)
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