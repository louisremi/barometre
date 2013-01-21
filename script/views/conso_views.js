(function(Backbone,window,$,_,App) {

var views = App.views = (App.views || {});

views.texteDict = {
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
		habillement:"l'habillement",
		transport:"les transports en commun",
		aucun:"aucun",
		ordi:"les technologies (ordinateur,internet…)",
		nsp:"ne se prononce pas"
	};

views.ConsoAnswerMonthView =Backbone.View.extend({
	template: _.template($("#bm-conso-answer-month-template").html()),

	//Element Selector ------------------------------------------------#
	graphSelector: ".conso-graph",
	logoSelector: ".logo-conso",
	texteSelector: ".texte-conso",
	cercleSelector: ".cercle-conso",
	labelSelector: ".label-conso",
	percentageSelector: "#percentage-conso-value",
	//-----------------------------------------------------------------#


	render: function() {
		this.$el.html(this.template());
		return this;
	},

	toggle: function() {
		this.$el.fadeToggle(300);
		return this;
	},

	hookUp: function(answer,position,max) {;
		this.$el.find(this.percentageSelector).text(answer.value);
		this.$el.find(this.labelSelector).text(App.views.texteDict[answer.title]);
		this.$el.find(this.cercleSelector).text(position+1);
		this.$el.find(this.graphSelector).css({height: (10+(5-position)*13)+'%'});

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

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	hookUp: function(answer,index,max) {
		this.$el.find(this.cercleSelector).text((''+(index+1)).length < 2 ? "\u2009"+(index+1)+"\u2009" : index+1);
		this.$el.find(this.labelSelector).text(App.views.texteDict[answer.title]);
		this.$el.css({top:44*index});
		this.$el.find(this.iconSelector).css({left:(33+(55*(answer.value/max)))+'%'});
		this.$el.find(this.percentageSelector).text(answer.value);

		if(index > 4)
			this.$el.find(this.cercleSelector).css({background:"#af62b2"});
		else
			this.$el.find(this.cercleSelector).css({background:"#571d74"});
	}
});

views.ConsoQuestionMonthView = Backbone.View.extend({
	template: _.template($("#bm-conso-question-month-template").html()),
	containerSelector: "#question-conso .answers",
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
		"habillement",
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

			self.toggleSize();
		});
	},

	toggleSize: function() {
		$(this.containerSelector).css($(this.containerSelector).height() > 600 ? {height:"500px"} : {height:"700px"} );
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
		})
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