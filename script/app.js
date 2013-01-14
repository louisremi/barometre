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

		//this.percentage = this.$el.find("span")[0];
		//this.wrapper = this.percentage.parentNode;

		return this;
	}/*,
	render: function() {
		var data = this.model.toJSON();

		this.percentage.innerHTML = data.value < 10 ?
			"\u2008" + data.value + "\u2008" :
			data.value;

		this.wrapper.style.fontSize = Math.round( data.value * 0.7 + 14 ) + "px";
		this.wrapper.style.top = Math.round( 85 - data.value * 0.4 ) + "px";

		return this;
	}*/
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

			/*answer.on("change:value", function() {
				answerView.render();
			});*/
		});

		this.collection.bind("reset", this.render);

		// initial render
		this.$el.empty();

		_(this._answerViews).each(function( answerView ) {
			self.$el.append( answerView.el );
		});

	}/*
	render: function() {
		_(this._answerViews).each(function( answerView ) {
			answerView.render();
		});
	}*/
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

var AppView = Backbone.View.extend({
	el : $("body"),

	initialize: function() {
		var self = this;

		this.questions = new App.QuestionCollection();

		this.testYearMenuView = new YearMenuView({
			model: new Backbone.Model({
				years: App.years
			})
		});

		var testAnswerCollection = new AnswerCollection([
			{
				className: "increase",
				value: 10,
				title: "<b>…augmenter (%)</b>",
				background: "#427324"
			},
			{
				className: "decrease",
				value: 34,
				title: "<b>…diminuer (%)</b>",
				background: "#f4a700"
			},
			{
				className: "stable",
				value: 52,
				title: "<b>…rester stable (%)</b>",
				background: "#f4c8d5"
			},
			{
				className: "nspp",
				value: 4,
				title: "…ne se prononce pas (%)",
				background: "#581e75"
			}
		]);

		var testAnswerCollectionView = new AnswerCollectionView({
			collection: testAnswerCollection,
			el: document.getElementById("test-answers-view")
		});

		var testPercentageCollectionView = new PercentageCollectionView({
			collection: testAnswerCollection,
			el: document.getElementById("test-answers-view")
		}).render();

		/*testAnswerCollection.on("change:value", function( answer ) {
			testAnswerCollectionView._answerViews[  ]
		});*/

		/*setTimeout(function() {
			testAnswerCollection.at(1).set({value: 9});
		}, 1000);*/

		/*var model1 = new Backbone.Model({
				value: 70,
				title: "<b>…augmenter (%)</b>",
				background: "#933"
			});

		this.testAnswerView = new AnswerView({
			el: document.getElementById("test-percentage"),
			className: "increase",
			model: model1
		});

		setTimeout(function() {
			self.testAnswerView.render();
		}, 0);

		model1.on("change:value", function() {
			self.testAnswerView.render();
		});

		setInterval(function() {
			model1.set({value: Math.round( Math.random() * 99 )});
		}, 2000);*/
	},

	render: function() {
		this.assign({
			".year-menu": this.testYearMenuView
		});
	},

	displayQuestion: function(type,year,month) {
		this.type = type;
		this.year = year;
		this.month = month;

		this.questions.setUrl( type, year, month );
		this.questions.fetch();

		this.render();
	}
});

window.App.AppView = AppView;

/*

var DisplayItemMenuView = Backbone.View.extend({
	template: _.template( $("#button-display-menu-template").html() ),
	tagName: "li",
	model: Backbone.Model,

	events: {
		"click a": "switchDisplay"
	},

	switchDisplay: function() {

	},

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});

var YearItemMenuView = Backbone.View.extend({
	template: _.template( $("#button-year-menu-template").html() ),
	tagName: "li",
	model: Backbone.Model,

	events: {
		"click a": "switchYear"
	},

	switchYear: function() {

	},

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});

var MonthMenuView = Backbone.View.extend({
	template: ""
});

var AppView = Backbone.View.extend({
	el : $("body"),

	initialize: function() {
		this.displayMenu = [
			this.displayMenuView = new DisplayItemMenuView({
				model: new Backbone.Model({
					url: "#",
					name: "prouts"
				})
			}),
			this.displayMenuView = new DisplayItemMenuView({
				model: new Backbone.Model({
					url: "#",
					name: "caca"
				})
			}),
			this.displayMenuView = new DisplayItemMenuView({
				model: new Backbone.Model({
					url: "#",
					name: "hello"
				})
			})
		];

		this.yearMenu = [
			this.yearMenuView = new YearItemMenuView({
				model: new Backbone.Model({
					url: "#",
					name: "2013"
				})
			}),
			this.yearMenuView = new YearItemMenuView({
				model: new Backbone.Model({
					url: "#",
					name: "2012"
				})
			}),
			this.yearMenuView = new YearItemMenuView({
				model: new Backbone.Model({
					url: "#",
					name: "2011"
				})
			})
		];
	},

	render: function() {
		this.assign({
			".display-menu": this.displayMenu,
			".year-menu": this.yearMenu
		});
	}
});

window.AppView = AppView; */

})(jQuery, Backbone, _, window);