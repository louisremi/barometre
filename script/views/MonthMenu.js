(function( App, Backbone ) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.MonthMenu = Backbone.View.extend({
	model: Backbone.Model,
	render: function( month ) {
		$(".month-select :checked").removeAttr("selected");

		$(".month-select [value='"+ App.ui.model.get("month") +"']").each(function() {
			if ( this.style.display != "none" ) {
				this.setAttribute("selected", "");
			}
		});
	}
});

App.dispatcher.on("monthChanged", function() {
	App.views.monthMenu.render();
});

})( App, Backbone );