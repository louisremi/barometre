(function(Backbone,window,$,_,App) {

var views = App.views = (App.views || {});

views.ConsoAnswerMonthView =Backbone.View.extend({
	template: _.template($("#bm-conso-answer-month-template").html()),

	//Element Selector ------------------------------------------------#
	graphSelector: ".conso-graph",
	logoSelector: ".logo-conso",
	texteSelector: ".texte-conso",
	cercleSelector: ".cercle-conso",
	labelSelector: ".label-conso",
	iconSelector: ".icon-conso",
	percentageSelector: "#percentage-conso-value",
	//-----------------------------------------------------------------#


	render: function(position) {
		this.$el.html(this.template());

		this.$percentage = this.$el.find(this.percentageSelector);
		this.$label = this.$el.find(this.labelSelector);
		this.$icon = this.$el.find(this.iconSelector);
		this.$el.find(this.cercleSelector).text(position+1);
		this.$el.find(this.graphSelector).css({height: (10+(5-position)*13)+'%'});

		return this;
	},

	toggle: function() {
		this.$el.fadeToggle(300);
		return this;
	},

	hookUp: function(answer,position,max) {
		this.$percentage.text(answer.value);
		this.$label.text( App.ui.depenses[answer.title].label );
		this.$icon.html( App.ui.depenses[answer.title].icon );
		this.$icon.css({color:App.ui.colors.conso[position]});

		return this;
	}

});

views.ConsoQuestionMonthAllView = Backbone.View.extend({
	template: _.template($("#bm-conso-answer-all-template").html()),
	//Element Selector ------------------------------------------------#
	placeSelector: ".conso-all-place",
	cercleSelector: ".conso-all-circle",
	labelSelector: ".conso-label",
	iconSelector: ".conso-icon-ranking",
	percentageSelector: "#percentage-conso-value",
	//-----------------------------------------------------------------#

	toggle: function() {
		this.$el.fadeToggle(300);
	},

	render: function(answer) {
		this.$el.html(this.template());

		this.$place = this.$el.find(this.placeSelector);
		this.$cercle = this.$el.find(this.cercleSelector);
		this.$el.find(this.labelSelector).text(answer.label);
		this.$icon = this.$el.find(this.iconSelector).html(answer.icon);
		this.$percentage = this.$el.find(this.percentageSelector);

		return this;
	},

	hookUp: function(answer,index,max) {
		this.$place.html( index + 1 );
		this.$cercle.css("color", index > 4 ? "#AE61B3" : "#641777" );
		this.$el.css({top:44*index});
		this.$icon.css({left:(33+(55*(answer.value/max)))+'%'});
		this.$percentage.text(answer.value);
		this.$icon.css({color:index < 5 ? App.ui.colors.conso[index] : "#d6d6d6"});
	}
});

views.ConsoQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-conso-question-month-template").html()),
	containerSelector: "#question-conso .answers",
	answers: ["first","second","third","fourth","fifth"],
	answerViews: {},
	answerViewsAll: {},
	allModifierSelector: ".conso-all",
	allText:"Voir l'ensemble des résultats",
	rankingText:"Retour au top 5 des résultats",

	initialize: function() {
		var self = this;
		this.all = false;
		this.isWithData = true;
		$(this.allModifierSelector).unbind("click");
		$(this.allModifierSelector).click(function() {
			if (self.isWithData) {
				_.each(self.answerViews,function(view) {
					view.toggle();
				});

				_.each(self.answerViewsAll,function(view) {
					view.toggle();
				});

				self.toggleSize();
				self.all = !self.all;

				$(this).text($(this).text() == self.allText ? self.rankingText : self.allText);
			}

			return false;
		});
	},

	toggleSize: function() {
		$(this.containerSelector).toggleClass("long-conso",!this.all);
	},

	render: function() {
		var self = this;
		this.$el.children(".answers").html(this.template({places: this.answers,types:App.ui.depenses}));

		_( this.answers ).each(function(answer, i) {
			var view = self.answerViews[answer] = new views.ConsoAnswerMonthView({el:self.$("#"+answer)});
			view.render(i);
		});

		_( App.ui.depenses ).each(function(depense, slug) {
			var view = self.answerViewsAll[slug] = new views.ConsoQuestionMonthAllView({el:self.$("#"+slug)});
			view.toggle();
			view.render(depense);
		});

		this.$graph = this.$el.find(".graph-container");
		this.$line = this.$el.find(".line-container");

		return this;
	},

	hookUp: function(question) {
		if (this.all)
			this.$line.show();
		else
			this.$graph.show();

		this.isWithData = true;
		
		var sortedAnswer = _.sortBy(question.get("answers"), function(answer) {
			return -answer.value;
		});
		var answerToDisplay = _.first(sortedAnswer,this.answers.length);
		var self = this;

		_.each(answerToDisplay, function(answer,index) {
			self.answerViews[self.answers[index]].hookUp(answer,index);
		});

		var max = _.max(sortedAnswer,function(answer) {
			return +answer.value;
		}).value;

		_.each(sortedAnswer,function(answer,index) {
			self.answerViewsAll[answer.title].hookUp(answer,index,max);
		});
	}
});

})(Backbone,window,$,_,window.App);
