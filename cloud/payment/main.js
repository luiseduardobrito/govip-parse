var Gateway = require('cloud/payment/gateway.js');
var Order = require('cloud/order/model.js');

var PaymentCloud = function(){}

PaymentCloud.prototype.create = function(request, response) {

	// Check order field
	if (!request.params.order) {
		return response.error("You have to specify the order");
	}

	try {

		// Create new payment gateway
		var gateway = new Gateway();	

		// Get order information
		var query = new Parse.Query(Order);
		query.get(request.params.order, {

			success: function(order) {

				// Prepare order information
				gateway.setOrder(order);

				// Send the information and get the result
				gateway.send(function(err, res) {
					return response.success();
				});
			},

			error: function(error) {
				response.error(error);
			}
		});
	}

	catch(e) {
		return response.error(e.message || e.toString());
	}
};

var payment = new PaymentCloud();
Parse.Cloud.define("paymentGateway", payment.create);
exports = payment;