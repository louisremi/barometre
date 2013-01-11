(function(window,Backbone,_,$) {

	var baseUrl = "http://127.0.0.1/api"

	var AnswerModel = Backbone.Model.extend({

		validKeys: ['id','title','value','attribute'],

		parse: function(response) {
			for (keys in response) {
				if(validKeys.indexOf(keys) === -1) {
					response[keys] = undefined;
				}
			}
		}
	});

	var AnswerCollection = Backbone.Collection.extend({

	});

	var QuestionModel = Backbone.Model.extend({

		parse: function(response) {
			response.answers = new AnswerCollection(respose.answers);
		},
	});

	var QuestionCollection = Backbone.Collection.extend({
		setUrl: function(type,year,month) {
			this.url = baseUrl+'/'+type+'/'+year+'/'+(!!month ? month+'/' : '');
		}
	});

	window.App.QuestionCollection = QuestionCollection;

})(window,Backbone,_,jQuery)