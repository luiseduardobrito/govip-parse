var OrderModel = Parse.Object.extend('Order', {}, {
	findById: function(order_id, fn) {
		var query = new Parse.Query(OrderModel);
		query.include('buyer');
		query.get(order_id, fn);
	}
});

module.exports = OrderModel;