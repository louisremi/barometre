(function( App, Backbone ) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.MonthMenu = Backbone.View.extend({
	model: Backbone.Model,
	render: function( month ) {
		$(".month-select option:selected").each(function() {
			// the jQuery method doesn't work
			this.removeAttribute("selected");
		});

		$(".month-select [value='"+ App.ui.model.get("month") +"']").each(function() {
			this.setAttribute("selected", "");
		});
	}
});

App.dispatcher.on("monthChanged", function() {
	App.views.monthMenu.render();
});

})( App, Backbone );