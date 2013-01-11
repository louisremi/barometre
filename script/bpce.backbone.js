(function($,Backbone) {


	Backbone.View.prototype.assign = function(selector,view) {
		var selectors;
	    if (_.isObject(selector)) {
	        selectors = selector;
	    }
	    else {
	        selectors = {};
	        selectors[selector] = view;
	    }
	    if (!selectors) return;
	    _.each(selectors, function (view, selector) {
	    	if(!!view.length) {
	    		for (var i=0,j=view.length;i<j;i++) {
	    			this.$(selector).append(view[i].render().el);
	    		}
	    	} else {
	        	view.setElement(this.$(selector)).render();
	    	}
	    }, this);
	};

	Backbone.CollectionView = function(options) {
		this._viewPointers = {};
		Backbone.View.apply(this,[options]);
	};

	Backbone.CollectionView.extend = Backbone.View.extend;

	_.extend(Backbone.CollectionView.prototype,Backbone.View.prototype,{
		renderCollection: function(selector) {
			var self = this;
			_.each(this._viewPointers,function(view) {
				$(selector,self.el).append(view.render().el);
			});
		},
		rendersCollectively: function() {
			var self = this;
			this._viewPointers = {}; // make sure we're starting over
			this.collection.each(function(model){
				self.addOne(model);
			});
			this.collection.on('add', function(model) {
				this.addOne(model);
				this.render();
			}, this);
			this.collection.on('remove', this.removeOne, this);
		},
		addOne: function(model) {
			view = new this.collectionView({ 'model': model, 'collection':this.collection});
			this._viewPointers[model.cid] = view;
		},
		removeOne: function(model) {
			this._viewPointers[model.cid].remove();
			delete this._viewPointers[model.cid];
		},
	});

	var dispatcher;
	dispatcher = _.extend({}, Backbone.Events, {
		cid: "dispatcher"
	});
	
	return _.each([Backbone.Collection.prototype, Backbone.Model.prototype, Backbone.View.prototype, Backbone.Router.prototype,Backbone.CollectionView.prototype], function(proto) {
		return _.extend(proto, {
  			globalDispatcher: dispatcher
		});
	});
})(jQuery,Backbone);
