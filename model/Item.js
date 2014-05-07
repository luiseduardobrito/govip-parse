var Parse = require('parse').Parse;

var Item = Parse.Object.extend("Item", {

	getEvent: function (attrs, options) {
		return this.get('event');
	}
	
}, {

	// Class methods
	getByEvent: function(e, fn) {

		fn = fn || function(){};

		var query = new Parse.Query(Item);
		query.equalTo('event', e);

		query.find({

			success: function(items) {
				fn(null, items);
			},

			error: function(error) {
				fn(error);
			}
		})
	}
});
 
module.exports = Item;