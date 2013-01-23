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
		this.compareViews = [];
		this.questionsCompareCollection = [];
	},

	render: function() {
		var self = this;
		this.$el.html( this.template({type:this.type}) );
		this.$percentages = this.$el.find(".percentage span");
		this.noDataContainer = this.$el.parent().find(".no-data");

		this.$el.parent().find(".more").click(function() {
			if (!this.compare) {
				var currentYear = App.ui.model.get("year");

				_.each(_.difference(App.ui.years,[+currentYear]),function(year,index) {
					var questions = new App.collections.QuestionCollection();
					questions.setUrl(self.type,year,('0'+App.ui.model.get("month")).slice(-2));

					questions.bind("reset",function() {
						var question = this.at(0);
						var view = self.compareViews ? self.compareViews[index] : undefined;
						if (!view) {
							view = new App.Views.QuestionMonth({type:self.type,el:$("<ul>")});
							self.$el.after(view.render().el);
							view.$el.addClass("answers");
						}
						if (question) {
							view.hookUp(question);
						} else {
							view.noData();
						}

						self.compareViews.push(view);

					},questions);

					questions.fetch();
					self.questionsCompareCollection.push(questions);
				});

			} else {
				_.each(self.compareViews,function(view) {
					view.remove();
				})
			}
			this.compare = !this.compare;
		});

		return this;
	},

	hookUp: function( question ) {
		var self = this;
		if (this.noDataContainer)
			this.noDataContainer.hide();
		this.$el.show();

		_.each(question.get("answers"), function(answer, i) {
			$( self.$percentages[i] ).html(
				( answer.value < 10 ? "&nbsp;" : "" ) +
				( answer.value || "-" ) +
				( answer.value < 10 ? "&nbsp;" : "" )
			);

			// if we are in compare.html, the dom node might not exist
			if ( self.$percentages[i] ) {
				var wrapper = self.$percentages[i].parentNode;

				wrapper.style.fontSize = Math.round( ( answer.value || 1 ) * 0.7 + 14 ) + "px";
				wrapper.style.top = Math.round( 85 - ( answer.value || 1 ) * 0.4 ) + "px";
			}
		});

		if (this.questionsCompareCollection.length) {
			_.each(_.difference(App.ui.years,[+App.ui.model.get("year")]),function(year,index) {
				self.questionsCompareCollection[index].setUrl(self.type,year,('0'+App.ui.model.get("month")).slice(-2));
				self.questionsCompareCollection[index].fetch();
			});
		}
	},

	noData: function() {
		this.noDataContainer.html(this.noDataTemplate());
		this.noDataContainer.show();
		this.$el.hide();
	}
});

})(Backbone,window,$,_,window.App);