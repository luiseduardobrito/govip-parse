var Ticket = require('cloud/ticket/model.js');
var Attendee = require('cloud/attendee/model.js');

var PaymentGateway = require('cloud/payment/main.js');

var random = function(low, high) {
	return Math.random() * (high - low) + low;
}

var BeforeSave = function(request, response) {

	if (!request.object.get("buyer")) {
		return response.error("You have to specify the buyer user");
	} 

	else if (!request.object.get("total") || request.object.get("total") <= 0) {
		return response.error("You have to specify a valid total value");
	}

	else if(!request.object.get("items")) {
		return response.error("You have to specify a valid items list");
	}

	else {

		// Set confirmed flag
		if(request.object.get("closed") === null)
			request.object.set("confirmed", false);

		if(request.object.get("closed") === null)
			request.object.set("closed", false);

		// Return result
		return response.success();
	}
}

Parse.Cloud.beforeSave("Order", BeforeSave);
exports = BeforeSave;