var AfterSave = function(request, response) {

	var smsCode = request.object.get("smsCode");

	// TODO: send code via sms

	var qrCode = request.object.get("qrCode");

	// TODO: send qrcode via email
}

Parse.Cloud.afterSave("Ticket", AfterSave);
exports = AfterSave;