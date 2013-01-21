(function(Backbone,window,$,_,App,Raphael) {

	var Views = App.Views = (App.Views || {});

	Views.QuestionEvolution = Backbone.View.extend({
		template:_.template($('#graphic-year-template').html()),
		dotsMap: {},

		initialize: function() {
		},

		render: function() {
			this.$el.html(this.template());

			this.r = Raphael(this.el);

			return this;
		},

		hookUp: function(questions,answerTitles) {

			var self = this;

			var coordY = [];
			_.each(questions, function(question,idxQuestion) {

				_.each(question.get("answers"),function(answer) {
					coordY[_.indexOf(answerTitles,answer.title)] = coordY[_.indexOf(answerTitles,answer.title)] || [];
					coordY[_.indexOf(answerTitles,answer.title)].push(answer.value);
				})
			});
			if (this.lines)
				this.lines.remove();

			this.lines = this.r.linechart(25,0,this.$el.width()-30,this.$el.height()-40,
					_.range(_.keys(App.ui.months).length),
					coordY,
					{nostroke:false,axis:"0 0 1 1",symbol:"circle",axisxstep:8,axisystep:10});

			var axisItems = this.lines.axis[0].text.items;
			for (var i = 0,j=axisItems.length;i<j;i++) {
				var index = parseInt(axisItems[i].attr("text"));
				axisItems[i].attr("y",axisItems[i].attr("y")+10);
				axisItems[i].attr("text",(_.map(App.ui.months,function(month) {return month}))[index][0]+"\r\n"+App.ui.model.get("year"));
			}

			var axisItems = this.lines.axis[1].text.items;
			for (var i = 0,j=axisItems.length;i<j;i++) {
				axisItems[i].attr("x",axisItems[i].attr("x")-5);
				axisItems[i].attr("text",axisItems[i].attr("text") + "%");
			}
		},
	});
})(Backbone,window,$,_,window.App,Raphael)