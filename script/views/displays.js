(function( App, Backbone ) {

App.DisplaysView = Backbone.View.extend({
	model: Backbone.Model,
	render: function() {
		// desactivate previous display button
		this.$el.find(".active").removeClass("active");

		this.$el.removeClass("month-display year-display evolution-display")
			.addClass( App.ui.model.get("display") + "-display" );
	}
});

App.dispatcher.on("displayChanged", function() {
	App.displaysView.render();
});

})( App, Backbone );