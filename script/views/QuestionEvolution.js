(function(Backbone,window,$,_,App,Raphael) {

	var Views = App.Views = (App.Views || {});

	Views.QuestionEvolutionLineButton = Backbone.View.extend({
		template: _.template($("#evo-line-button").html()),
		tagName: "li",
		className: "evo-button-container",

		events: {
			"click" : "toggleLine"
		},

		initialize: function(options) {
			this.line = options.line;
			this.dots = options.dots;
			this.widthPercentage = options.widthPercentage;
			this.visible = true;
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.css({"background-color":this.line.attr("stroke"),width:this.widthPercentage+"%"});
			return this;
		},

		toggleLine: function() {
			if(this.visible) {
				this.line.hide();
				this.dots.hide();
				this.$el.css({"background-color":"#ddd"});
			} else {
				this.line.show();
				this.dots.show();
				this.$el.css({"background-color":this.line.attr("stroke")});
			}
			this.visible = !this.visible;
		}
	})

	Views.QuestionEvolution = Backbone.View.extend({
		template:_.template($('#graphic-year-template').html()),

		initialize: function() {
		},

		render: function() {
			this.$el.html(this.template());

			this.r = Raphael(this.$el.find(".evo-raphael-paper")[0],676,260);

			return this;
		},

		hookUp: function(questions,answerTitles) {	

			var self = this,type = questions[0].get("type");

			var coordY = [];
			_.each(questions, function(question,idxQuestion) {

				_.each(question.get("answers"),function(answer) {
					coordY[_.indexOf(answerTitles,answer.title)] = coordY[_.indexOf(answerTitles,answer.title)] || [];
					coordY[_.indexOf(answerTitles,answer.title)].push(answer.value);
				})
			});
			if (this.lines)
				this.lines.remove();

			this.lines = this.r.linechart(25,-10,676,260,
					_.range(_.keys(App.ui.months).length),
					coordY,
					{nostroke:false,axis:"0 0 1 1",symbol:"circle",axisxstep:9,axisystep:10,colors:App.ui.colors});

			this.$el.find(".evo-lines-buttons").empty();
			_.each(this.lines[0],function(line,index) {
				var view = new App.Views.QuestionEvolutionLineButton(
					{model: new Backbone.Model({text:App.ui.questions[type].answers[index].label}),
					widthPercentage: 31,
					line:line,
					dots:self.lines[2][index]});

				self.$el.find(".evo-lines-buttons").append(view.render().el);
			});


			var axisItems = this.lines.axis[0].text.items;
			for (var i = 0,j=axisItems.length;i<j;i++) {
				var index = parseInt(axisItems[i].attr("text"));
				axisItems[i].attr("y",axisItems[i].attr("y")+10);
				axisItems[i].attr("text",(_.map(App.ui.months,function(month) {return month}))[index][0]+"\r\n"+App.ui.model.get("year"));
			}

			var axisItems = this.lines.axis[1].text.items;
			this.lines.axis[1].attr("opacity",0);
			for (var i = 0,j=axisItems.length;i<j;i++) {
				axisItems[i].attr("x",axisItems[i].attr("x")-5);
				axisItems[i].attr("text",axisItems[i].attr("text") + "%");
			}
		},
	});
})(Backbone,window,$,_,window.App,Raphael)