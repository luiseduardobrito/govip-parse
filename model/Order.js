var Parse = require('parse').Parse;

var Order = Parse.Object.extend("Order", {

	getTotalValue: function () {
		return this.get("total");
	},

	getBuyer: function (attrs, options) {
		return this.get('buyer');
	}
	
}, {

	// Class methods
	place: function(buyer, item) {
		var order = new Order();
		order.set('buyer', buyer);
		return monster;
	}
});
 
module.exports = Order;