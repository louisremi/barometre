(function(Backbone,window,$,_,App) {

var views = App.views =(App.views || {});

views.AproposView = Backbone.View.extend({
	template: _.template($("#bm-apropos-template").html()),

	initialize: function() {

	},
});

})(Backbone,window,$,_,window.App)