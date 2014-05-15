var Order = require('cloud/order/model.js');

var PaymentGateway = function(request, response) {

	if(!request.params.order) {
		return response.error("No order defined");
	}

	else {

		var user = Parse.User.current();
		console.log(user)
		console.log(user.get('token'));

		if(!user || !user.get('token')) {
			return response.error('unauthorized');
		}


		Order.findById(request.params.order, {

			success: function(order) {

				Parse.Cloud.httpRequest({
			
					method: 'POST',
					url: 'http://api.govipclub.com.br/payment',

					body: {
						token: user.get('token'),
						order: order.id
					},

					success: function(httpResponse) {
						response.success(httpResponse.data);
					},

					error: function(httpResponse) {
						response.error(httpResponse);
					}
				});
			},

			error: function(err) {
				response.error(err);
			}
		});
	}
}

Parse.Cloud.define("paymentGateway", PaymentGateway);
module.exports = PaymentGateway;