(function( App, Backbone ) {

App.Views.DisplayMenu = Backbone.View.extend({
	model: Backbone.Model,
	render: function() {
		this.el.className = this.el.className.replace(/\b\w+-display\b/g, "");
		this.$el.addClass( App.ui.model.get("display") + "-display" );
	}
});

App.dispatcher.on("displayChanged", function() {
	App.views.displayMenu.render();
});

})( App, Backbone );