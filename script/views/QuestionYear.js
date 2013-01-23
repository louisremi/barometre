(function(Backbone,window,$,_,App) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.QuestionYearMonth = Backbone.View.extend({
	template: _.template($("#question-year-month-template").html()),
	tagName: "div",
	className: "year-month",
	positions: [{
		x: 45,
		y: 26
	}, {
		x: 155,
		y: 26
	}, {
		x: 45,
		y: 98
	}, {
		x: 155,
		y: 98
	}, {
		x: 100,
		y: 62
	}],

	initialize: function() {

	},

	render: function( options ) {
		var self = this;

		this.$el.html( this.template( options ) );

		this.$year = this.$el.find("span");

		this.$answers = this.$el.find("li");

		this.$answers.each(function( i ) {
			this.style.background = App.ui.colors[ i == options.answersLength - 1 ? App.ui.colors.length - 1 : i ];
			this.style.left = self.positions[i].x + "px";
			this.style.top = self.positions[i].y + "px";
		});

		return this;
	},

	hookUp: function( answers ) {
		var self = this;

		_( answers ).each(function( answer, i ) {
			var li = self.$answers.get(i);
			li.innerHTML =
				( answer.value < 10 ? "&nbsp;" : "" ) +
				( answer.value || "-" ) +
				( answer.value < 10 ? "&nbsp;" : "" );

			li.style.fontSize = Math.round( ( answer.value || 1 ) * 0.43 + 12 ) + "px";
			li.style.left = self.positions[i].x - ( answer.value || 1 ) * .40 + "px";
			li.style.top = self.positions[i].y - ( answer.value || 1 ) * .23 + "px";
		});
	}
});

App.Views.QuestionYear = Backbone.View.extend({
	template: _.template($("#question-year-template").html()),
	noDataTemplate: _.template($("#no-data-template").html()),
	monthViews: {},

	initialize: function(options) {
		this.type = options.type;
	},

	render: function() {
		var self = this;

		this.$el.html( this.template({type:this.type}) );

		var $visualization = this.$el.parent();
		_( App.ui.months ).each(function(month, i) {
			var view = self.monthViews[i] = new App.Views.QuestionYearMonth(),
				year = App.ui.model.get("year");

			view.render({
				month: month[1],
				answersLength: App.ui.questions[self.type].answers.length
			});

			$visualization.append( view.$el );
		});

		this.noDataContainer = this.$el.parent().find(".no-data");

		return this;
	},

	hookUp: function( questions ) {
		var self = this,
			year = App.ui.model.get("year");

		_( this.monthViews ).each(function( monthView ) {
			monthView.el.style.display = "none";
			monthView.$year.html( year );
		});

		_( questions ).each(function( question, i ) {
			var month = question.get("month"),
				monthView = self.monthViews[ month ];

			monthView.hookUp( question.get("answers") );
			monthView.el.style.display = "block";
		});
	},

	noData: function() {
		this.noDataContainer.html(this.noDataTemplate());
		this.noDataContainer.show();
		this.$el.hide();
	}
});

})(Backbone,window,$,_,window.App);