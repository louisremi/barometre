(function( App, Backbone ) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.YearMenu = Backbone.View.extend({
	model: Backbone.Model,
	render: function( year ) {
		$(".year-select :checked").removeAttr("selected");

		$(".year-select [value='"+ App.ui.model.get("year") +"']")
			.attr("selected", "")
			.trigger("change");
	}
});

App.dispatcher.on("yearChanged", function() {
	App.views.yearMenu.render();
});

})( App, Backbone );