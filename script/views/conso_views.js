(function(Backbone,window,$,_,App) {

var views = App.views =(App.views || {});

views.ConsoAnswerMonthView =Backbone.View.extend({
	template: _.template($("#bm-conso-answer-month-template").html()),

	//Element Selector ------------------------------------------------#
	graphSelector: ".conso-graph",
	logoSelector: ".logo-conso",
	texteSelector: ".texte-conso",
	cercleSelector: ".cercle-conso",
	labelSelector: ".label-conso",
	percentageSelector: "#percentage-conso-value",
	containerSelector: "#question-conso .answers",
	//-----------------------------------------------------------------#

	texteDict: {
		alim:"l'alimentation",
		essence:"l'essence",
		impot:"les impôts",
		elec:"l'électricité",
		sante:"la santé",
		gaz:"le gaz",
		logement:"le logement",
		entretien:"les travaux et l'entretien de la maison",
		voiture:"l'achat de la voiture",
		ecole:"l'école",
		autres:"autres",
		transport:"les transports en commun",
		aucun:"aucun",
		ordi:"les technologies (ordinateur,internet…)",
		nsp:"ne se prononce pas"
	},


	render: function() {
		this.$el.html(this.template());
		return this;
	},

	toggle: function() {
		this.$el.toggle();
		return this;
	},

	hookUp: function(answer,position) {
		$(this.containerSelector).css({height:"500px"});
		this.$el.find(this.percentageSelector).text(answer.value);
		this.$el.find(this.labelSelector).text(this.texteDict[answer.title]);
		this.$el.find(this.cercleSelector).text(position+1);
		this.$el.find(this.graphSelector).css({height: (10+(5-position)*13)+'%'});

		return this;
	}

});

views.ConsoQuestionMonthAllView = Backbone.View.extend({
	template: _.template($("#bm-conso-answer-all-template").html()),

	toggle: function() {
		this.$el.toggle();
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	hookUp: function() {

	}
});

views.ConsoQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-conso-question-month-template").html()),
	answers: ["first","second","third","fourth","fifth"],
	answersAll: [
		"alim",
		"essence",
		"impot",
		"elec",
		"sante",
		"gaz",
		"logement",
		"entretien",
		"voiture",
		"ecole",
		"autres",
		"transport",
		"aucun",
		"ordi",
		"nsp"
	],
	answerViews: {},
	answerViewsAll: {},
	allModifierSelector: ".conso-all",

	initialize: function() {
		var self = this;
		$(this.allModifierSelector).click(function() {
			_.each(self.answerViews,function(view) {
				view.toggle();
			});

			_.each(self.answerViewsAll,function(view) {
				view.toggle();
			});
		});
	},

	render: function() {
		this.$el.html(this.template({places: this.answers,types:this.answersAll}));

		this.$el.addClass('conso-list-container');

		for ( answer in this.answers ) {
			var view = this.answerViews[this.answers[answer]] = new views.ConsoAnswerMonthView({el:this.$("#"+this.answers[answer])});
			view.render();
		}

		for ( answer in this.answersAll) {
			var view = this.answerViewsAll[this.answersAll[answer]] = new views.ConsoQuestionMonthAllView({el:this.$("#"+this.answersAll[answer])});
			view.toggle();
			view.render();
		}

		return this;
	},

	hookUp: function(question) {
		var answerToDisplay = _.first(
			_.sortBy(question.get("answers"), function(answer) {
				return -answer.value;
			})
		,this.answers.length), self = this;

		_.each(answerToDisplay, function(answer,index) {
			self.answerViews[self.answers[index]].hookUp(answer,index);
		});
	},

	changeDisplay: function() {
		console.log("modify");
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

})(Backbone,window,$,_,window.App)