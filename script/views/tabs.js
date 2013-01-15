(function( App, Backbone ) {

App.TabsView = Backbone.View.extend({
	model: Backbone.Model,
	render: function() {
		// desactivate previous tab
		this.$el.find(".active").removeClass("active");
		
		// fade-out all tabs
		$("#bm-tabs").css({opacity: 0});
		setTimeout(function() {
			var activeTabs = App.ui.tabs[ App.ui.model.get("tab") ];
			// show all active tabs, hide others
			$(".tab").each(function() {
				var label = this.id.split("-")[1];
				
				$(this).css({
					display: _( activeTabs ).contains( label ) ? "block" : "none"
				});
			});

			$("#bm-tabs").css({opacity: 1});

		}, App.ui.transitionDuration + 50 );

		var self = this,
			i = 0,
			activeTab = App.ui.model.get("tab");

		_( App.ui.tabs ).each(function( tab, label ) {
			if ( label == activeTab ) {
				// activate current tab
				self.$el.find("li:nth-of-type(" + ( i + 1 ) + ")").addClass("active");
				return;
			}
			i++;
		});
	}
});

App.dispatcher.on("tabChanged", function() {
	App.tabsView.render();
});

})( App, Backbone );