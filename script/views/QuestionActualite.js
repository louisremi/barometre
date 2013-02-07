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

	hookUp: function( question ) {
		var self = this;

		// The questions
		this.$el.parent().children("h3").html( question.get("title") );

		// The answers
		this.$el.children(".answers").html( this.template({
			answers: question.get("answers")
		}) );
		this.$percentages = this.$el.find(".percentage span:last-child");

		// The position
		_.each(question.get("answers"), function(answer, i) {
			if ( self.$percentages[i] ) {
				var wrapper = self.$percentages[i].parentNode;

				wrapper.style.fontSize = Math.round( ( answer.value || 1 ) * 0.58 + 14 ) + "px";
				wrapper.style.top = Math.round( 105 - ( answer.value || 1 ) * 0.4 ) + "px";
			}
		});
	}
});

})(Backbone,window,$,_,window.App);