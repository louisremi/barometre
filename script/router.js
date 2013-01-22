(function( window, Backbone, App ) {

	if ( !App.views.question ) {
		App.views.question = {};
	}

	// The idea is to use a model to store the state of the UI,
	// because we won't systematically redraw the UI on each click
	var BarometreRouter = Backbone.Router.extend({

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

					// update children on month update
					if ( App.children && App.children.length ) {
						_( App.children ).each(function(child) {
							child.postMessage("/" + model.get("month"), "*");
						});
					}
				}

				if ( model.hasChanged("display") || model.hasChanged("tab") ) {
					// supprimer toutes le contenu des .question
					// trouver quel mode de display.
					// pour chaque type question on doit retrouver quelle objet vue correpond a ce mode de display

					if(model.hasChanged("display")) {
						_.each(App.ui.tabs[ "courant" ],function(value) {
							if (value !="apropos" && App.views.question[value]) {
								App.views.question[value].remove();
								App.views.question[value] = undefined
							}
					});
					}
					_.each(App.ui.tabs[ model.get("tab") ],function(value) {
						if((!App.views.question[value] && model.hasChanged("tab")) || model.hasChanged("display")) {
							App.views.question[value] = new (App.ui.questions[value].display[model.get('display')])({type:value});
						}
					});

					App.views.Manager.draw(App.views.question);
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