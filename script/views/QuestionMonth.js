(function(Backbone,window,$,_,App) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.QuestionMonth = Backbone.View.extend({
	template: _.template($("#question-month-template").html()),

	initialize: function(options) {
		this.type = options.type;
	},

	render: function() {
		this.$el.children(".answers").html( this.template({type:this.type}) );
		this.$percentages = this.$el.find(".percentage span:last-child");

		return this;
	},

	hookUp: function( questions ) {
		var self = this,
			question = questions[0];

		_( question.get("answers") ).each(function(answer, i) {
			$( self.$percentages[i] ).html( answer.value );

			// if we are in compare.html, the dom node might not exist
			if ( self.$percentages[i] ) {
				var wrapper = self.$percentages[i].parentNode;

				wrapper.style.fontSize = Math.round( ( answer.value || 1 ) * 0.58 + 14 ) + "px";
				wrapper.style.top = Math.round( 105 - ( answer.value || 1 ) * 0.4 ) + "px";
			}
		});
	}
});

})(Backbone,window,$,_,window.App);