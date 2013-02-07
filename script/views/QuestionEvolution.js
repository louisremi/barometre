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
			this.visible = true;
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()))
				.css({"background-color":this.line.attr("stroke")});
			return this;
		},

		toggleLine: function() {
			var anim;

			if(this.visible) {
				anim = Raphael.animation({opacity:0},300);
				this.line.animate(anim);
				this.dots.animate(anim);
				this.$el.css({"background-color":"#ddd"});
			} else {
				anim = Raphael.animation({opacity:100},300);
				this.line.animate(anim);
				this.dots.animate(anim);
				this.$el.css({"background-color":this.line.attr("stroke")});
			}
			this.visible = !this.visible;
		}
	});

	Views.QuestionEvolution = Backbone.View.extend({

		render: function() {
			var $paperWrapper = $("<div class='evo-raphael-paper'></div>").appendTo( this.$el );
			
			this.r = Raphael( $paperWrapper[0], 706, 349 );
			this.$lines = $paperWrapper;
			this.$answers = this.$el.children(".answers");

			return this;
		},

		hookUp: function(questions,answerTitles) {
			var self = this,type = questions[0].get("type");
			var coordY = [];

			_.each(questions, function(question,idxQuestion) {
				var questionMonth = question.get("month");
				_.each(question.get("answers"),function(answer) {
					coordY[_.indexOf(answerTitles,answer.title)] = coordY[_.indexOf(answerTitles,answer.title)] || new Array(10);
					if(App.ui.months[questionMonth])
						coordY[_.indexOf(answerTitles,answer.title)][questionMonth < 8 ? questionMonth-1 : questionMonth-3] = answer.value;
				});
			});

			if (answerTitles.length == App.ui.questions.conso.answerSlugs.length) {
				var averageIndex = [];
				$("#question-conso .answers").removeClass("long-conso");

				_.each(coordY,function(coord,index) {
					var average = _.reduce(coord,function(memo,num) { return memo + num; }) / coord.length;
					averageIndex.push([index,average]);
				});

				_.sortBy(averageIndex,function(value) {
					return value[1];
				});

				var newCoordY = new Array(5);
				for (var i = 0,j=newCoordY.length; i < j;i++) {
					newCoordY[i] = coordY[averageIndex[i][0]];
				}

				coordY = newCoordY;
			}

			if (self.lines)
				self.lines.remove();

			var colors = answerTitles.length == App.ui.questions.conso.answerSlugs.length ? App.ui.colors.conso : App.ui.colors._default;

			// force the container to be visible to fix axis rendering issues in Webkit
			//var disp = self.$el.parents().css({display: "block"}); //doesn't work
			
			self.lines = self.r.linechart(30,30,666,260,
					_.range(_.keys(App.ui.months).length),
					coordY,
					{nostroke:false,axis:"0 0 1 1",width:3,symbol:"circle",axisxstep:9,axisystep:10,colors:colors});

			self.$answers.empty();

			_.each(self.lines[0],function(line,index) {
				var textLine = "";
				if ( answerTitles == App.ui.questions.conso.answerSlugs.length ) {
					textLine = App.ui.questions[type].answers[averageIndex[index][0]].label;
				} else {
					textLine = App.ui.questions[type].answers[index].label;
				}
				var view = new App.Views.QuestionEvolutionLineButton(
					{model: new Backbone.Model({text:textLine}),
					line:line,
					dots:self.lines[2][index]});

				self.$answers.append(view.render().el);
			});

			var axisItems = self.lines.axis[0].text.items;
			for (var i = 0,j=axisItems.length;i<j;i++) {
				var index = parseInt(axisItems[i].attr("text"), 10);
				axisItems[i].attr("y",axisItems[i].attr("y")+10);
				axisItems[i].attr("text",( _.map( App.ui.months, returnMonth ) )[index][0]+"\r\n"+App.ui.model.get("year"));
			}

			axisItems = self.lines.axis[1].text.items;
			self.lines.axis[1].attr("opacity",0);
			for (var i = 0,j=axisItems.length;i<j;i++) {
				axisItems[i].attr("x",axisItems[i].attr("x")-5);
				axisItems[i].attr("text",axisItems[i].attr("text") + "%");
			}
		}
	});

function returnMonth(month) {
	return month;
}

})(Backbone,window,$,_,window.App,Raphael);