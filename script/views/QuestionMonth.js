(function(Backbone,window,$,_,App) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.QuestionMonth = Backbone.View.extend({
	template: _.template($("#question-month-template").html()),
	noDataTemplate: _.template($("#no-data-template").html()),

	initialize: function(options) {
		this.type = options.type;
	},

	render: function() {
		this.$el.html( this.template({type:this.type}) );
		this.$percentages = this.$el.find(".percentage span");
		this.noDataContainer = this.$el.parent().find(".no-data");

		return this;
	},

	hookUp: function( question ) {
		var self = this;
		if (this.noDataContainer)
			this.noDataContainer.hide();
		this.$el.show();

		_.each(question.get("answers"), function(answer, i) {
			$( self.$percentages[i] ).html(
				( answer.value < 10 ? "&nbsp;" : "" ) +
				//( /^1/.test( answer.value) ? "\u2009" : "" ) +*/
				( answer.value || "-" ) +
				//( /1$/.test( answer.value) ? "\u2009" : "" ) +
				( answer.value < 10 ? "&nbsp;" : "" )
			);

			// if we are in compare.html, the dom node might not exist
			if ( self.$percentages[i] ) {
				var wrapper = self.$percentages[i].parentNode;

				wrapper.style.fontSize = Math.round( ( answer.value || 1 ) * 0.7 + 14 ) + "px";
				wrapper.style.top = Math.round( 85 - ( answer.value || 1 ) * 0.4 ) + "px";
			}
		});
	},

	noData: function() {
		this.noDataContainer.html(this.noDataTemplate());
		this.noDataContainer.show();
		this.$el.hide();
	}
});

})(Backbone,window,$,_,window.App);