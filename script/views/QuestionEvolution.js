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
				var anim = Raphael.animation({opacity:0},300);
				this.line.animate(anim);
				this.dots.animate(anim);
				this.$el.css({"background-color":"#ddd"});
			} else {
				var anim = Raphael.animation({opacity:100},300);
				this.line.animate(anim);
				this.dots.animate(anim);
				this.$el.css({"background-color":this.line.attr("stroke")});
			}
			this.visible = !this.visible;
		}
	})

	Views.QuestionEvolution = Backbone.View.extend({
		template:_.template($('#graphic-year-template').html()),
		noDataTemplate: _.template($("#no-data-year-template").html()),

		initialize: function() {
		},

		render: function() {
			this.$el.html(this.template());

			this.r = Raphael(this.$el.find(".evo-raphael-paper")[0],706,349);	

			return this;
		},

		noData: function() {
			this.noDataContainer = this.$el.parent().find(".no-data");
			this.noDataContainer.html(this.noDataTemplate());
			this.noDataContainer.show();
			this.$el.hide();
		},

		hookUp: function(questions,answerTitles) {
			var self = this,type = questions[0].get("type");

			if (this.noDataContainer)
				this.noDataContainer.hide();
			this.$el.show();

			this.el.parentNode.parentNode.style.display = "block";

			var coordY = [];

			_.each(questions, function(question,idxQuestion) {
				var questionMonth = question.get("month");
				_.each(question.get("answers"),function(answer) {
					coordY[_.indexOf(answerTitles,answer.title)] = coordY[_.indexOf(answerTitles,answer.title)] || new Array(10);
					if(App.ui.months[questionMonth])
						coordY[_.indexOf(answerTitles,answer.title)][questionMonth < 8 ? questionMonth-1 : questionMonth-3] = answer.value;
				})
			});

			if (self.lines)
				self.lines.remove();

			self.lines = self.r.linechart(30,30,666,260,
					_.range(_.keys(App.ui.months).length),
					coordY,
					{nostroke:false,axis:"0 0 1 1",width:3,symbol:"circle",axisxstep:9,axisystep:10,colors:App.ui.colors});

			self.$el.find(".evo-lines-buttons").empty();
			_.each(self.lines[0],function(line,index) {
				var view = new App.Views.QuestionEvolutionLineButton(
					{model: new Backbone.Model({text:App.ui.questions[type].answers[index].label}),
					widthPercentage: 31,
					line:line,
					dots:self.lines[2][index]});

				self.$el.find(".evo-lines-buttons").append(view.render().el);
			});

			self.lines/*.hover(function () {

				var symbol = this.symbols ? this.symbols[0] : this.symbol;
               	this.tag = self.r.tag(this.x, this.y, this.value+"%", 160, 10).insertBefore(this).attr([{ fill: "#fff" ,opacity:symbol.attr("opacity")}, { fill: symbol.attr("fill"),opacity:symbol.attr("opacity")}]);
            }, function () {
                this.tag && this.tag.remove();
            })*/;



			var axisItems = self.lines.axis[0].text.items;
			for (var i = 0,j=axisItems.length;i<j;i++) {
				var index = parseInt(axisItems[i].attr("text"));
				axisItems[i].attr("y",axisItems[i].attr("y")+10);
				axisItems[i].attr("text",(_.map(App.ui.months,function(month) {return month}))[index][0]+"\r\n"+App.ui.model.get("year"));
			}

			var axisItems = self.lines.axis[1].text.items;
			self.lines.axis[1].attr("opacity",0);
			for (var i = 0,j=axisItems.length;i<j;i++) {
				axisItems[i].attr("x",axisItems[i].attr("x")-5);
				axisItems[i].attr("text",axisItems[i].attr("text") + "%");
			}
		},
	});
})(Backbone,window,$,_,window.App,Raphael)