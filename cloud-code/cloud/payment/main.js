var Gateway = require('cloud/payment/gateway');

var PaymentCloud = function(){}

PaymentCloud.prototype.create = function(request, response) {

	// Check order field
	if (!request.object.get("order")) {
		return response.error("You have to specify the order");
	}

	try {

		// Create new payment gateway
		var gateway = new Gateway();	

		// Prepare order information
		gateway.setOrder(request.object.get("order"));

		// Send the information and get the result
		gateway.send(function(err, res) {
			return response.success();
		});
	}

	catch(e) {
		return response.error(e);
	}
};

var payment = new PaymentCloud;
Parse.Cloud.define("paymentGateway", payment.create);
exports = payment;