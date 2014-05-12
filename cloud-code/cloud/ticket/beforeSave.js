function random (low, high) {
	return Math.random() * (high - low) + low;
}

var BeforeSave = function(request, response) {

	if (!request.object.get("order")) {
		response.error("You have to specify the order to generate the ticket");
	}

	else if(!request.object.get("item")) {
		response.error("You have to specify a event item ");
	}

	else if(!request.object.get("attendee")) {
		response.error("You have to specify an attendee");
	}

	else {

		// Generate sms code
		request.object.set('smsCode', random(1000, 10000));

		// Generate qr code
		request.object.set('qrCode', random(1000, 10000));

		// Return result
		response.success();
	}
}

Parse.Cloud.beforeSave("Ticket", BeforeSave);
exports = BeforeSave;