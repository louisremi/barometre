(function(Backbone,window,$,_,App) {

var views = App.views =(App.views || {});

views.ActualiteQuestionMonthView = App.Views.QuestionMonth.extend({
	template: _.template($("#question-actu-month-template").html()),

	hookUp: function(question) {
		this.$noData.hide();
		this.$percentages.parent().parent().parent().show();

		var numberMaxAnswer = 5;
		
		var self = this, answersToHook = _.filter(question.get("answers"),function(answer){ return answer.attribute });
		if (!this.answerShown)
			this.answerShown = 5;

		_.each(answersToHook, function(answer, i) {
			$( self.$percentages[i] ).html(
				( answer.value < 10 ? "&nbsp;" : "" ) +
				( answer.value || "-" ) +
				( answer.value < 10 ? "&nbsp;" : "" )
			);

			self.$el.find("#"+i+"-element .percentage span").css({"background-color":App.ui.colors._default[i],color:App.ui.colors.font[i]});
			if (App.ui.picClass[answer.attribute])
				self.$el.find("#"+i+"-element")[0].className = App.ui.picClass[answer.attribute];
			else
				self.$el.find("#"+i+"-element")[0].className = "";

			if (App.ui.actuText[answer.attribute])
				$(self.$el.find(".heading")[i]).html(App.ui.actuText[answer.attribute]);
			else
				$(self.$el.find(".heading")[i]).html(answer.attribute);

			// if we are in compare.html, the dom node might not exist
			if ( self.$percentages[i] ) {
				var wrapper = self.$percentages[i].parentNode;

				wrapper.style.fontSize = Math.round( ( answer.value || 1 ) * 0.7 + 14 ) + "px";
				wrapper.style.top = Math.round( 85 - ( answer.value || 1 ) * 0.4 ) + "px";
			}
		});

		self.$el.find("#"+(answersToHook.length-1)+"-element .percentage span").css({"background-color":App.ui.colors._default[App.ui.colors._default.length-1],color:App.ui.colors.font[App.ui.colors._default.length-1]});

		for (var i = this.answerShown;i<answersToHook.length;i++) {
			self.$el.find("#"+i+"-element").show();
		}

		for (var i = answersToHook.length;i<numberMaxAnswer;i++) {
			self.$el.find("#"+i+"-element").hide();
		}

		this.answerShown = answersToHook.length;
	},

	noData: function() {
		this.$noData.show();
		this.$percentages.parent().parent().parent().hide();
	}
});

})(Backbone,window,$,_,window.App)