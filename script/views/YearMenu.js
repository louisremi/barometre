(function( App, Backbone ) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.YearMenu = Backbone.View.extend({
	model: Backbone.Model,
	render: function( year ) {
		$( this.el.querySelectorAll(".year-menu") ).each(function() {
			this.className = this.className.replace(/\byear-\d+\b/g, "") +
			" " + "year-" + ( year || App.ui.model.get("year") );
		});
	}
});

App.dispatcher.on("yearChanged", function() {
	App.views.yearMenu.render();
});

})( App, Backbone );