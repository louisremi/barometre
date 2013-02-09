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
			var answers = question.get("answers"),
				nbAnswers = answers.length,
				answersByLine = nbAnswers % 5 === 0 ? 5 :
					nbAnswers % 4 === 0 ? 4 :
					nbAnswers % 3 === 0 ? 3 :
					4;

			// calculate style of answers
			_( answers ).map(function( answer ) {
				answer.fontSize = Math.round( ( answer.value || 1 ) * 0.58 + 14 ) + "px";
				answer.top = Math.round( 105 - ( answer.value || 1 ) * 0.4 ) + "px";
			});

			self.$el.append( self.template({
				question: question.get("title"),
				answers: answers,
				answersByLine: answersByLine
			}) );

			/*var $percentages = self.$el.find(".answers:last .percentage span:last-child");

			// The position
			_( question.get("answers") ).each(function(answer, i) {
				if ( $percentages[i] ) {
					var wrapper = $percentages[i].parentNode;

					wrapper.style.fontSize = Math.round( ( answer.value || 1 ) * 0.58 + 14 ) + "px";
					wrapper.style.top = Math.round( 105 - ( answer.value || 1 ) * 0.4 ) + "px";
				}
			});*/
		});
	}
});

})(Backbone,window,$,_,window.App);