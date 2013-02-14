(function(Backbone,window,$,_,App) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.QuestionActualite = Backbone.View.extend({
	template: _.template($("#question-actu-template").html()),

	initialize: function(options) {
		this.type = options.type;
	},

	render: function() {
		return this;
	},

	hookUp: function( questions ) {
		var self = this;

		// reset the view
		this.$el.children(".answers").css({display: "none"})
			.nextAll().remove();

		_( questions ).each(function( question ) {
			var isRanking = true,
				answers = _.filter( question.get("answers"), function( answer ) {
					answer.value = parseInt( answer.value, 10 );

					if ( answer.value > 5 ) {
						isRanking = false;
					}
					return !isNaN(answer.value);
				}),
				nbAnswers = answers.length,
				answersByLine = nbAnswers % 5 === 0 ? 5 :
					nbAnswers % 4 === 0 ? 4 :
					nbAnswers % 3 === 0 ? 3 :
					4;

			_( answers ).each(function( answer, i ) {
				if ( isRanking ) {
					answer.fontSize = Math.round( ( 6 - answer.value ) * 15 * 0.58 + 14 ) + "px";
					answer.top = Math.round( 105 - ( 6 - answer.value ) * 15 * 0.4 ) + "px";

					answer.background = App.ui.colors.conso[ i ];

				} else {
					answer.fontSize = Math.round( ( answer.value || 1 ) * 0.58 + 14 ) + "px";
					answer.top = Math.round( 105 - ( answer.value || 1 ) * 0.4 ) + "px";

					if ( nbAnswers < 6 ) {
						answer.background = App.ui.colors._default[ i == nbAnswers - 1 ? App.ui.colors._default.length - 1 : i ];

					} else {
						answer.background = App.ui.colors.actu[ i ];
					}
				}
			});

			self.$el.append( self.template({
				question: question.get("title"),
				answers: answers,
				answersByLine: answersByLine,
				img: question.get("image")
			}) );
		});
	}
});

})(Backbone,window,$,_,window.App);