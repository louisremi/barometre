(function( App, Backbone ) {

App.LinksView = Backbone.View.extend({
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
				.replace( ":display", self.model.get("display") )
				.replace( ":tab", self.model.get("tab") )
				.replace( ":year", self.model.get("year") )
				.replace( ":month", self.model.get("month") );
		});
	}
});

App.dispatcher.on("routeChange", function() {
	App.linksView.render();
});

})( App, Backbone );