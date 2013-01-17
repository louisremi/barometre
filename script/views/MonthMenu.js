(function( App, Backbone ) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.MonthMenu = Backbone.View.extend({
	model: Backbone.Model,
	render: function() {
		this.el.className = this.el.className.replace(/\bmonth-\d+\b/g, "");
		this.$el.addClass( "month-" + App.ui.model.get("month") );
	}
});

App.dispatcher.on("monthChanged", function() {
	App.views.monthMenu.render();
});

})( App, Backbone );