(function( App, Backbone ) {
	
if ( !App.Views ) {
	App.Views = {};
}

App.Views.TabMenu = Backbone.View.extend({
	model: Backbone.Model,
	render: function() {
		// desactivate previous tab
		this.$el.find(".active").removeClass("active");
		
		// fade-out all tabs
		$("#tabs").css({opacity: 0});
		setTimeout(function() {
			var activeTabs = App.ui.tabs[ App.ui.model.get("tab") ];
			// show all active tabs, hide others
			$(".tab").each(function() {
				var label = this.id.split("-")[1];
				
				$(this).css({
					display: _( activeTabs ).contains( label ) ? "block" : "none"
				});

			});

			$("#tabs").css({opacity: 1});

			// send current document height to parent frame
			window.parent.postMessage( document.body.offsetHeight, "*" );

		}, App.ui.transitionDuration + 50 );

		var self = this,
			i = 0,
			activeTab = App.ui.model.get("tab");

		_( App.ui.tabs ).each(function( tab, label ) {
			if ( label == activeTab ) {
				// activate current tab
				self.$el.find("li:eq(" + i + ")").addClass("active");
				return;
			}
			i++;
		});
	}
});

App.dispatcher.on("tabChanged", function() {
	App.views.tabMenu.render();
});

})( App, Backbone );