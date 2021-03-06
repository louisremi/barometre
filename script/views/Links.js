(function( App, Backbone ) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.Links = Backbone.View.extend({
	model: Backbone.Model,
	render: function() {
		var self = this;

		this.$el.find("a").each(function() {
			var dataHref = this.getAttribute("data-href"),
				href;

			if ( !dataHref ) {
				return;
			}

			this.href = "#bm/" + dataHref
				.replace( ":display", self.model.get("display") == "compare" && this.parentNode.parentNode.id == "tab-menu" ? "month" : self.model.get("display") )
				.replace( ":tab", self.model.get("tab") )
				.replace( ":year", self.model.get("display") != "compare" ? self.model.get("year") : /^month-\d/.test( this.parentNode.className ) ? "all" : App.ui.years[0] )
				.replace( ":month", self.model.get("month") );
		});
	}
});

App.dispatcher.on("routeChanged", function() {
	App.views.links.render();
});

})( App, Backbone );