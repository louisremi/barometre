(function( App, Backbone ) {

App.MonthsView = Backbone.View.extend({
	model: Backbone.Model,
	render: function() {
		this.el.className = this.el.className.replace(/\bmonth-\d+\b/g, "");
		this.$el.addClass( "month-" + App.ui.model.get("month") );
	}
});

App.dispatcher.on("monthChanged", function() {
	App.monthsView.render();
});

})( App, Backbone );