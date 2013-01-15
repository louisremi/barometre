(function(window,Backbone,_,$,App) {

	var model = App.model = {};
	var collections = App.collections = {};

	var baseUrl = "http://bpce.herokuapp.com/api"

	model.AnswerModel = Backbone.Model.extend({

		validKeys: ['id','title','value','attribute'],

		parse: function(response) {
			for (keys in response) {
				if(validKeys.indexOf(keys) === -1) {
					response[keys] = undefined;
				}
			}
		}
	});

	collections.AnswerCollection = Backbone.Collection.extend({
		model:model.AnswerModel,
	});

	model.QuestionModel = Backbone.Model.extend({

		parse: function(response) {
			response.answers = new collections.AnswerCollection(response.answers);
		},
	});

	collections.QuestionCollection = Backbone.Collection.extend({
		setUrl: function(type,year,month) {
			this.url = baseUrl+'/'+type+'/'+year+'/'+(!!month ? month+'/' : '');
		}
	});

})(window,Backbone,_,jQuery,window.App)