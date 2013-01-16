(function($, Backbone, _, window) {

var YearMenuView = Backbone.View.extend({
	template: _.template( $("#item-year-menu-template").html() ),
	model: Backbone.Model,
	events: {
		"click a": "switchDisplay"
	},
	switchDisplay: function(e) {
		console.log(e.currentTarget);
	},
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	}
});

var AnswerModel = Backbone.Model.extend({});

var AnswerView = Backbone.View.extend({
	template: _.template( $("#answer-template").html() ),
	model: AnswerModel,
	initialize: function() {
		// initial render
		this.$el.html( this.template( this.model.toJSON() ) );

		return this;
	}
});

var AnswerCollection = Backbone.Collection.extend({
	model: AnswerModel
});

var AnswerCollectionView = Backbone.View.extend({
	initialize: function() {
		var self = this;

		this._answerViews = [];

		this.collection.each(function( answer ) {
			var answerView = new AnswerView({
				model: answer,
				tagName: "li",
				className: answer.get("className")
			});

			self._answerViews.push( answerView );
		});

		this.collection.bind("reset", this.render);

		// initial render
		this.$el.empty();

		_(this._answerViews).each(function( answerView ) {
			self.$el.append( answerView.el );
		});

	}
});

var PercentageView = Backbone.View.extend({
	model: AnswerModel,
	render: function( percentage, wrapper ) {
		var data = this.model.toJSON();

		percentage.innerHTML = data.value < 10 ?
			"\u2008" + data.value + "\u2008" :
			data.value;

		wrapper.style.fontSize = Math.round( data.value * 0.7 + 14 ) + "px";
		wrapper.style.top = Math.round( 85 - data.value * 0.4 ) + "px";

		return this;
	}
});

var PercentageCollectionView = Backbone.View.extend({
	initialize: function() {
		var self= this;

		this.collection.on( "reset", this.render, this );
	},
	render: function() {
		var self = this;

		this.$el.children().each(function( i, el ) {
			var span = el.querySelector("span");
			new PercentageView({
				model: self.collection.at( i )
			}).render( span, span.parentNode );
		});
	}
});

var QuestionView = Backbone.View.extend({
	initialize: function() {
		var answerCollection = new AnswerCollection( this.model.answers );

		new YearMenuView({
			model: new Backbone.Model({
				years: App.years
			}),
			el: this.el.querySelector(".year-menu")
		}).render();

		new AnswerCollectionView({
			collection: answerCollection,
			el: this.el.querySelector(".answers")
		});

		new PercentageCollectionView({
			collection: answerCollection,
			el: this.el.querySelector(".answers")
		}).render();
	}
});

var AppView = Backbone.View.extend({
	el : $("body"),

	initialize: function() {
		var self = this;

		/*_( App.questionData ).each(function( questionData, type ) {
			new QuestionView({
				el: document.querySelector( "#question-" + type ),
				model: questionData
			}).render();
		});*/
	},

	render: function() {
	},

	displayQuestion: function(type,year,month) {
		this.type = type;
		this.year = year;
		this.month = month;

		/*this.questions.setUrl( type, year, month );
		this.questions.fetch();

		this.render();*/
	}
});

window.App.AppView = AppView;

})(jQuery, Backbone, _, window);