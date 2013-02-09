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
			var answers = _.filter( question.get("answers"), function( answer ) {
					if ( answer.value ) {
						answer.fontSize = Math.round( ( answer.value || 1 ) * 0.58 + 14 ) + "px";
						answer.top = Math.round( 105 - ( answer.value || 1 ) * 0.4 ) + "px";
						return true;
					}
				}),
				nbAnswers = answers.length,
				answersByLine = nbAnswers % 5 === 0 ? 5 :
					nbAnswers % 4 === 0 ? 4 :
					nbAnswers % 3 === 0 ? 3 :
					4;

			self.$el.append( self.template({
				question: question.get("title"),
				answers: answers,
				answersByLine: answersByLine
			}) );
		});
	}
});

})(Backbone,window,$,_,window.App);