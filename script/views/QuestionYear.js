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
			this.style.background = options.type == "conso" ?
				App.ui.colors.conso[i] :
				App.ui.colors._default[ i == options.answersLength - 1 ? App.ui.colors._default.length - 1 : i ];
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
			li.style.left = self.positions[i].x - ( answer.value || 1 ) * 0.40 + "px";
			li.style.top = self.positions[i].y - ( answer.value || 1 ) * 0.23 + "px";
		});
	}
});

App.Views.QuestionYear = Backbone.View.extend({
	template: _.template($("#question-year-template").html()),
	noDataTemplate: _.template($("#no-data-year-template").html()),

	initialize: function(options) {
		this.type = options.type;
		this.monthViews = {};
	},

	render: function() {
		var self = this;

		this.$el.html( this.template({type:this.type}) );
		this.$el.append(this.noDataTemplate());
		this.$noData = this.$el.find(".no-data");
		this.$noData.hide();

		var $visualization = this.$el.parent();
		_( App.ui.months ).each(function(month, i) {
			var view = self.monthViews[i] = new App.Views.QuestionYearMonth(),
				year = App.ui.model.get("year");

			view.render({
				month: month[1],
				answersLength: Math.min( App.ui.questions[self.type].answers.length, 5 ),
				type: self.type
			});

			$visualization.append( view.$el );
		});

		this.$yearMonth = $visualization.find(".year-month");
		this.$answers = this.$el.find(".year-answer");

		return this;
	},

	hookUp: function( questions ) {
		var self = this,
			year = App.ui.model.get("year");

		this.$noData.hide();
		this.$yearMonth.show();
		this.$answers.show();

		_( this.monthViews ).each(function( monthView ) {
			monthView.el.style.display = "none";
			monthView.$year.html( year );
		});

		_( questions ).each(function( question, i ) {
			var month = question.get("month"),
				monthView = self.monthViews[ month ];

			// sometime we receive data for month that don't exist, ignore it
			if ( monthView ) {
				monthView.hookUp( question.get("answers").slice(0,5) );
				monthView.el.style.display = "block";
			}
		});
	},

	noData: function() {
		var self = this;
		this.$noData.show().css({display:"block"});
		this.$yearMonth.hide();
		this.$answers.hide();
	}
});

})(Backbone,window,$,_,window.App);