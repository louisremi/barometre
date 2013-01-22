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

		return this;
	}

});

views.ConsoQuestionMonthAllView = Backbone.View.extend({
	template: _.template($("#bm-conso-answer-all-template").html()),
	//Element Selector ------------------------------------------------#
	cercleSelector: ".conso-all-place",
	labelSelector: ".conso-label",
	iconSelector: ".conso-icon-ranking",
	percentageSelector: "#percentage-conso-value",
	//-----------------------------------------------------------------#

	toggle: function() {
		this.$el.fadeToggle(300);
	},

	render: function(answer) {
		this.$el.html(this.template());

		this.$cercle = this.$el.find(this.cercleSelector);
		this.$el.find(this.labelSelector).text(answer.label);
		this.$icon = this.$el.find(this.iconSelector).html(answer.icon);
		this.$percentage = this.$el.find(this.percentageSelector);

		return this;
	},

	hookUp: function(answer,index,max) {
		var tmp = this.$cercle.html((''+(index+1)).length < 2 ? "&nbsp;"+(index+1)+"&nbsp;" : index+1);
		tmp[0].className = tmp[0].className.replace(/\b\w+-circle\b/g, "") + " " + ( index > 4 ?
				"pink" :
				"purple"
			) + "-circle";

		this.$el.css({top:44*index});
		this.$icon.css({left:(33+(55*(answer.value/max)))+'%'});
		this.$percentage.text(answer.value);
	}
});

views.ConsoQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-conso-question-month-template").html()),
	noDataTemplate: _.template($("#no-data-template").html()),
	containerSelector: "#question-conso .answers",
	answers: ["first","second","third","fourth","fifth"],
	answerViews: {},
	answerViewsAll: {},
	allModifierSelector: ".conso-all",

	initialize: function() {
		var self = this;
		if (!$(this.allModifierSelector).data("listenerInitialized")) {
			$(this.allModifierSelector).click(function() {
				_.each(self.answerViews,function(view) {
					view.toggle();
				});

				_.each(self.answerViewsAll,function(view) {
					view.toggle();
				});

				self.toggleSize();
			});

			$(this.allModifierSelector).data("listenerInitialized",true);
		}
	},

	toggleSize: function() {
		$(this.containerSelector).css($(this.containerSelector).height() > 600 ? {height:"500px"} : {height:"700px"} );
	},

	render: function() {
		var self = this;

		this.$el.html(this.template({places: this.answers,types:App.ui.depenses}));

		this.$el.addClass('conso-list-container');

		_( this.answers ).each(function(answer, i) {
			var view = self.answerViews[answer] = new views.ConsoAnswerMonthView({el:self.$("#"+answer)});
			view.render(i);
		});

		_( App.ui.depenses ).each(function(depense, slug) {
			var view = self.answerViewsAll[slug] = new views.ConsoQuestionMonthAllView({el:self.$("#"+slug)});
			view.toggle();
			view.render(depense);
		});

		return this;
	},

	hookUp: function(question) {
		if (this.noDataContainer)
			this.noDataContainer.hide();
		this.$el.show();
		
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
	},

	noData: function() {
		this.noDataContainer = this.$el.parent().find(".no-data");
		this.noDataContainer.html(this.noDataTemplate());
		this.noDataContainer.show();
		this.$el.hide();
	}
});

views.ConsoQuestionYearView = Backbone.View.extend({
	template: _.template($("#bm-conso-question-year-template").html()),

	initialize: function() {

	},

	render: function() {
		this.$el.html(this.template());
		return this;
	}
});

})(Backbone,window,$,_,window.App);