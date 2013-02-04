(function(Backbone,window,$,_,App) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.QuestionYearMonth = Backbone.View.extend({
	template: _.template($("#question-year-month-template").html()),
	compareTemplate: _.template($("#question-compare-template").html()),
	tagName: "div",
	className: "year-month",

	initialize: function( options ) {
		this.type = options.type;
	},

	render: function( options ) {
		var self = this;

		this.$el.html( this[ options.compare ? "compareTemplate" : "template" ]( options ) );

		this.$year = this.$el.find("span");

		this.$answers = this.$el.find("li");

		this.$answers.each(function( i ) {
			this.childNodes[0].style.color = self.type == "conso" ?
				App.ui.colors.conso[i] :
				App.ui.colors._default[ i == options.answersLength - 1 ? App.ui.colors._default.length - 1 : i ];

			if ( options.type != "conso" ) {
				this.childNodes[1].style.color = App.ui.colors.font[ i == options.answersLength - 1 ? App.ui.colors._default.length - 1 : i ];
			}

			this.style.left = App.ui.questions[ self.type ].answers[i].position[0] + "px";
			this.style.top = App.ui.questions[ self.type ].answers[i].position[1] + "px";
		});

		return this;
	},

	hookUp: function( answers ) {
		var self = this;
		_( answers ).each(function( answer, i ) {
			var li = self.$answers.get(i);
			li.childNodes[1].innerHTML =
				( answer.value < 10 ? "&nbsp;&nbsp;" : "" ) +
				( answer.value || "-" ) +
				( answer.value < 10 ? "&nbsp;&nbsp;" : "" );

			li.style.fontSize = Math.round( ( answer.value || 1 ) * 0.43 + 12 ) + "px";

			if ( App.ui.questions[ self.type ].answers[i].centered ) {
				li.style.left = App.ui.questions[ self.type ].answers[i].position[0] - ( answer.value || 1 ) * 0.40 + "px";
				li.style.top = App.ui.questions[ self.type ].answers[i].position[1] - ( answer.value || 1 ) * 0.23 + "px";
			}
		});
	}
});

App.Views.QuestionYear = Backbone.View.extend({
	template: _.template($("#question-year-template").html()),

	initialize: function(options) {
		this.type = options.type;
		this.monthViews = {};
	},

	render: function() {
		var self = this;

		this.$el.children(".answers").html( this.template({type:this.type}) );

		var $visualization = this.$el;
		_( App.ui.months ).each(function(month, i) {
			var view = self.monthViews[i] = new App.Views.QuestionYearMonth( {type: self.type} ),
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
	}
});

})(Backbone,window,$,_,window.App);