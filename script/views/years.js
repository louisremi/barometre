(function( App, Backbone ) {

App.YearsView = Backbone.View.extend({
	model: Backbone.Model,
	render: function() {
		this.el.className = this.el.className.replace(/\byear-\w+\b/g, "");
		this.$el.addClass( "year-" + App.ui.model.get("year") );
	}
});

App.dispatcher.on("yearChanged", function() {
	App.yearsView.render();
});

})( App, Backbone );