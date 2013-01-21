(function( App, Backbone ) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.YearMenu = Backbone.View.extend({
	model: Backbone.Model,
	render: function() {
		this.el.className = this.el.className.replace(/\byear-\w+\b/g, "") +
		" " + "year-" + App.ui.model.get("year");
	}
});

App.dispatcher.on("yearChanged", function() {
	App.views.yearMenu.render();
});

})( App, Backbone );