(function(Backbone,window,$,_,App,Raphael) {

	var Views = App.Views = (App.Views || {});

	Views.QuestionEvolution = Backbone.View.extend({
		template:_.template($('#graphic-year-template').html()),
		dotsMap: {},

		initialize: function() {
		},

		render: function() {
			this.$el.html(this.template());

			return this;
		},

		hookUp: function(questions,answerTitles) {

			var self = this;

			if (!this.lines) {
				this.r = Raphael(this.el);

				var titles = _.map(App.ui.months,function(g) {return 0});

				this.lines = this.r.linechart(10,10,this.$el.width()-20,this.$el.height()-20,
					_.range(_.keys(App.ui.months).length),
					_.map(answerTitles,function(v){return titles;}),
					{nostroke:false,axis:"0 0 1 1",symbol:"circle"});
				for(title in answerTitles) {
					for(month in App.ui.months) {
						if (!this.dotsMap[answerTitles[title]])
							this.dotsMap[answerTitles[title]] = {};
						this.dotsMap[answerTitles[title]][month]  = this.lines[title][month];
					}
				}
			}

			var coordY = [];
			_.each(questions, function(question,idxQuestion) {

				_.each(question.get("answers"),function(answer) {
					coordY[_.indexOf(answerTitles,answer.title)] = coordY[_.indexOf(answerTitles,answer.title)] || [];
					coordY[_.indexOf(answerTitles,answer.title)].push(answer.value);
				})
			});

			this.newllines = this.r.linechart(10,10,this.$el.width()-20,this.$el.height()-20,
					_.range(_.keys(App.ui.months).length),
					coordY,
					{nostroke:false,axis:"0 0 1 1",symbol:"circle"});

			_.each(this.lines,function(line,i) {
				line.animate({path:self.newllines[i].attr("path")},200);
			});

			_.each(this.lines.symbols[0],function(symbol,i){
            	symbol.animate({ cx: self.newllines.symbols[0][i].attr("cx"),cy: self.newllines.symbols[0][i].attr("cy") }, 200);
        	});

        	this.newllines.remove();
		},
	});
})(Backbone,window,$,_,window.App,Raphael)