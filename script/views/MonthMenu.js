(function( App, Backbone ) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.MonthMenu = Backbone.View.extend({
	model: Backbone.Model,
	render: function( month ) {
		$( this.el.querySelectorAll(".months") ).each(function() {
			this.className = this.className.replace(/\bmonth-\d+\b/g, "") +
			" " + "month-" + ( month || App.ui.model.get("month") + "" ).replace( /^0/, "" );
		});
	}
});

App.dispatcher.on("monthChanged", function() {
	App.views.monthMenu.render();
});

})( App, Backbone );