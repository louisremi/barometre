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
		this.$el.html( this.template({type:this.type}) );
		return this;
	},

	hookUp: function(question) {
		
	}
});

})(Backbone,window,$,_,window.App);