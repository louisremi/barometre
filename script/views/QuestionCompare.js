(function(Backbone,window,$,_,App) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.QuestionCompare = Backbone.View.extend({
	template: _.template($("#question-year-template").html()),

	initialize: function(options) {
		this.type = options.type;
		this.yearViews = {};
	},

	render: function() {
		var self = this,
			month = App.ui.months[ App.ui.model.get("month") ][1];

		this.$el.children(".answers").html( this.template({type:this.type}) );

		var $visualization = this.$el;
		_( App.ui.years ).each(function(year) {
			var view = self.yearViews[year] = new App.Views.QuestionYearMonth({ type: self.type });

			view.render({
				year: year,
				month: month,
				answersLength: Math.min( App.ui.questions[self.type].answers.length, 5 ),
				type: self.type,
				compare: true
			});

			$visualization.append( view.$el );
		});

		this.$yearMonth = $visualization.find(".year-month");
		this.$answers = this.$el.find(".year-answer");

		return this;
	},

	hookUp: function( questions ) {
		var self = this,
			month = App.ui.months[ App.ui.model.get("month") ][1];

		_( this.yearViews ).each(function( yearView ) {
			yearView.el.style.display = "none";
			yearView.$year.html( month );
		});

		_( questions ).each(function( question ) {
			var year = question.get("year"),
				yearView = self.yearViews[ year ];

			// sometime we receive data for month that don't exist, ignore it
			if ( yearView ) {
				yearView.hookUp( question.get("answers").slice(0,5) );
				yearView.el.style.display = "";
			}
		});
	}
});

})(Backbone,window,$,_,window.App);