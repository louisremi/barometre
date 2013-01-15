(function( window, Backbone, App ) {

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
				App.dispatcher.trigger("routeChange");

				/*if ( model.hasChanged("tab") ) {
					App.ui.selectTab();
				}
				/*if ( model.hasChanged("display") ) {
					App.ui.draw();

				} else if ( model.hasChanged("tab") ) {
					App.ui.selectTab();

				} else if ( model.hasChanged("year") || model.hasChanged("month") ) {
					// I don't know, find something to do!

				}*/


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
					month: App.ui.now.getMonth()
				});
			} else {
				this.model.set({
					display: display,
					tab: tab,
					year: year,
					month: month || ""
				});
			}
		}
	});

	window.App.BarometreRouter = BarometreRouter;

})( window, Backbone, App );