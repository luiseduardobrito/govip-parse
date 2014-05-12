function random (low, high) {
	return Math.random() * (high - low) + low;
}

var BeforeSave = function(request, response) {

	if (!request.object.get("buyer")) {
		response.error("You have to specify the buyer user");
	} 

	else if (!request.object.get("total") || request.object.get("total") <= 0) {
		response.error("You have to specify a valid total value");
	} 

	else {
		request.object.set('smsCode', random(1000, 10000));
		response.success();
	}
}

Parse.Cloud.beforeSave("Order", BeforeSave);
exports = BeforeSave;