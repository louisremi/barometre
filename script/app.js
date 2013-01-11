(function($, Backbone, _, window) {

var YearMenuView = Backbone.View.extend({
	template: _.template( $("#item-year-menu-template").html() ),
	model: Backbone.Model,
	events: {
		"click a": "switchDisplay"
	},
	switchDisplay: function(e) {
		console.log(e.currentTarget)
	},
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	}
});

var AnswerView = Backbone.View.extend({
	model: Backbone.Model,
	render: function() {
		this.$el.text( this.model.value );
		return this;
	}
});

var AppView = Backbone.View.extend({
	el : $("body"),

	initialize: function() {
		this.testYearMenuView = new YearMenuView({
			model: new Backbone.Model({
				years: App.years
			})
		});

		this.testAnswerView = new AnswerView({
			model: {
				value: 10
			}
		});
	},

	render: function() {
		this.assign({
			".year-menu": this.testYearMenuView
		});
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