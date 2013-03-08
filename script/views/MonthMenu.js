(function( App, Backbone ) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.MonthMenu = Backbone.View.extend({
	model: Backbone.Model,
	render: function( month ) {
		$(".month-select").val( App.ui.model.get("month") );
	}
});

App.dispatcher.on("monthChanged", function() {
	App.views.monthMenu.render();
});

})( App, Backbone );