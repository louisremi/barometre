(function(Backbone,window,$,_,App) {

if ( !App.Views ) {
	App.Views = {};
}

App.Views.QuestionMonth = Backbone.View.extend({
	template: _.template($("#question-month-template").html()),
	noDataTemplate: _.template($("#no-data-template").html()),

	initialize: function(options) {
		this.type = options.type;
		this.compare = false;
		this.compareViews = new Array(2);
		this.questionsCompareCollection = new Array(2);
	},

	render: function() {
		var self = this;
		this.$el.html( this.template({type:this.type}) );
		this.$percentages = this.$el.find(".percentage span");
		this.$el.append(this.noDataTemplate());
		this.$noData = this.$el.find(".no-data");
		this.$noData.hide();
		this.$el.parent().parent().find(".more").unbind("click");
		this.$el.parent().parent().find(".more").click(function() {
			if (!self.compare) {
				var currentYear = App.ui.model.get("year");

				_.each(_.difference(App.ui.years,[+currentYear]),function(year,index) {
					var questions = new App.collections.QuestionCollection();
					questions.setUrl(self.type,year,('0'+App.ui.model.get("month")).slice(-2));

					questions.bind("reset",function() {
						var question = this.at(0);
						var view = self.compareViews ? self.compareViews[index] : undefined;
						if (!view) {
							view = new App.Views.QuestionMonth({type:self.type,el:$("<ul>")});
							var yearEl = self.$el.parent().parent().find(".year-"+year).clone();
							self.$el.after(view.render().el);
							view.$el.before("<ul class='year-menu'>"+yearEl[0].outerHTML+"</ul>");
							view.$el.addClass("answers");
							self.compareViews[index] = view;
						}
						if (question) {
							view.hookUp(question);
						} else {
							view.noData();
						}
						view.$el.prev().children().attr({className:"year-"+this.year}).children().text(this.year);
					},questions);

					questions.fetch();
					self.questionsCompareCollection[index] = questions;
				});

			} else {
				_.each(self.compareViews,function(view) {
					view.$el.prev().remove();
					view.remove();
				});
				self.compareViews = new Array(2);
				self.questionsCompareCollection = new Array(2);
			}
			self.compare = !self.compare;
		});

		return this;
	},

	hookUp: function( question ) {
		var self = this;
		this.$noData.hide();
		this.$percentages.parent().parent().parent().show();

		_.each(question.get("answers"), function(answer, i) {
			$( self.$percentages[i] ).html(
				( answer.value < 10 ? "&nbsp;" : "" ) +
				( answer.value || "-" ) +
				( answer.value < 10 ? "&nbsp;" : "" )
			);

			// if we are in compare.html, the dom node might not exist
			if ( self.$percentages[i] ) {
				var wrapper = self.$percentages[i].parentNode;

				wrapper.style.fontSize = Math.round( ( answer.value || 1 ) * 0.58 + 14 ) + "px";
				wrapper.style.top = Math.round( 105 - ( answer.value || 1 ) * 0.4 ) + "px";
			}
		});

		if (this.questionsCompareCollection[0]) {
			_.each(_.difference(App.ui.years,[+App.ui.model.get("year")]),function(year,index) {
				self.questionsCompareCollection[index].setUrl(self.type,year,('0'+App.ui.model.get("month")).slice(-2));
				self.questionsCompareCollection[index].fetch();
			});
		}
	},

	noData: function() {
		var self = this;
		this.$noData.show();
		this.$percentages.parent().parent().parent().hide();

		if (this.questionsCompareCollection[0]) {
			_.each(_.difference(App.ui.years,[+App.ui.model.get("year")]),function(year,index) {
				self.questionsCompareCollection[index].setUrl(self.type,year,('0'+App.ui.model.get("month")).slice(-2));
				self.questionsCompareCollection[index].fetch();
			});
		}
	}
});

})(Backbone,window,$,_,window.App);