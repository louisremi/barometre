(function($, Backbone, _, window) {

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

window.AppView = AppView;

})(jQuery, Backbone, _, window);