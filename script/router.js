(function( window, Backbone, App ) {

	// The idea is to use a model to store the state of the UI,
	// because we won't systematically redraw the UI on each click
	var BarometreRouter = Backbone.Router.extend({

		initialize: function(options) {
			this.model = App.ui.model = new Backbone.Model({
				display: null,
				tab: null,
				year: null,
				month: null
			});

			// we use a model as a router because we want to now what changed
			this.model.on("change", function() {
				if ( this.model.hasChanged("display") ) {
					App.ui.draw();

				} else if ( this.model.hasChanged("tab") ) {
					App.ui.selectTab();

				} else if ( this.model.hasChanged("year") || this.model.hasChanged("month") ) {
					// I don't know, find something to do!

				}
			});
		},

		routes: {
			"": "barometre",
			":display/:tab/:year/?": "barometre",
			":display/:tab/:year/:month/?": "barometre"
		},

		barometre: function( display, tab, year, month ) {
			if ( arguments.length ) {
				this.model.set({
					display: App.ui.tabs.courant,
					tab: App.ui.displays.month,
					year: App.ui.years[ App.ui.now.getFullYear() ],
					month: App.ui.months[ App.ui.now.getMonth() ]
				});
			} else {
				this.model.set({
					display: App.ui.tabs[ tab ],
					tab: App.ui.displays[ display ],
					year: App.ui.years[ year ]
				});
				if ( month ) {
					this.model.set( "month", App.ui.months[ month ] );
				}
			}
		}
	});

	window.App.BarometreRouter = BarometreRouter;

})( window, Backbone, App );