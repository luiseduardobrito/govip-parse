var Gateway = require('cloud/payment/gateway.js');
var Order = require('cloud/order/model.js');

var PaymentCloud = function(){}

PaymentCloud.prototype.create = function(request, response) {

	// Check order field
	if (!request.params.order) {
		return response.error("You have to specify the order");
	}

	try {

		console.log(1);

		// Create new payment gateway
		var gateway = new Gateway("pagesguro");	

		console.log(2);

		// Get order information
		var query = new Parse.Query(Order);
		query.get(request.params.order, {

			success: function(order) {

				console.log(3);

				// Prepare order information
				gateway.setOrder(order);

				console.log(4);

				// Send the information and get the result
				gateway.send(function(err, res) {

					console.log(5);
					return response.success();
				});
			},

			error: function(error) {
				console.log(6);
				response.error(error);
			}
		});
	}

	catch(e) {
		var msg = e.filename + " - " + e.message;
		return response.error(msg);
	}
};

var payment = new PaymentCloud();
Parse.Cloud.define("paymentGateway", payment.create);
exports = payment;