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
				}

				if ( model.hasChanged("display") || model.hasChanged("tab") ) {
					// supprimer toutes le contenu des .answers
					// trouver quel mode de display.
					// pour chaque type question on doit retrouver quelle objet vue correpond a ce mode de display

					if ( model.hasChanged("display") ) {
						_.each(App.ui.tabs[ "courant" ],function(value) {
							if (value !="apropos" && App.views.question[value]) {
								if(App.views.question[value].$el) {
									App.views.question[value].$el.children(".answers").empty()
										.nextAll().remove();
								}
								delete App.views.question[value];
							}
						});
					}
					_.each(App.ui.tabs[ model.get("tab") ],function(value) {
						if( ( !App.views.question[value] && model.hasChanged("tab") ) || model.hasChanged("display") ) {
							App.views.question[value] = new (App.ui.questions[value].display[model.get('display')])({type:value});
						}
					});

					App.views.Manager.draw(App.views.question);
				}

				// redirect before fetching data, if required
				if ( model.get("display") == "month" || model.get("display") == "compare" ) {
					// if date is after now
					if ( model.get("display") == "month" && model.get("year") * 100 + ( +model.get("month") ) > App.ui.now.getFullYear() * 100 + App.ui.now.getMonth() + 1 ) {
						return window.location = "#bm/month/" + [ model.get("tab"), App.ui.now.getFullYear(), App.ui.now.getMonth() + 1 ].join("/");
					}

					// if we know we don't have data for that path
					var path = [ model.get("tab"), model.get("year"), model.get("month") ].join("/");
					if ( path in App.ui.redirects ) {
						return window.location = "#bm/" + model.get("display") + "/" + App.ui.redirects[ path ];
					}
				}

				App.collections.questions.setUrl(
					App.ui.tabs[self.model.get("tab")].join("/"),
					self.model.get("year"),
					self.model.get("display") == "month" || self.model.get("display") == "compare" ? ( "0" + self.model.get("month") ).slice(-2) : ""
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
					month: App.ui.now.getMonth() + 1
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
			setTimeout(function() {
				// send current document height to parent frame
				window.parent.postMessage( document.body.offsetHeight, "*" );
			}, App.ui.transitionDuration + 50 );
		}
	});

	window.App.BarometreRouter = BarometreRouter;

})( window, Backbone, App );