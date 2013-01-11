(function($,Backbone,_,window){

	var BarometreRouter = Backbone.Router.extend({

		initialize: function(options) {
			this.appView = options.appView;
		},

		routes: {
			"": "question",
			"question/:type/:year/?": "question",
			"question/:type/:year/:month/?": "question"
		},

		question: function(type,year,month) {
			if (!!type) {
				var now = new Date();
				type = 'pouvoir';
				year = now.getFullYear();
				month = ('0'+now.getMonth()+1).slice(-2);
			}
			this.appView.displayQuestion(type,year,month);
		}
	});

	window.App.BarometreRouter = BarometreRouter;

})(jQuery,Backbone,_,window)