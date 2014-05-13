var x2js = require('cloud/payment/lib/xml2json.js');

var PagSeguroGateway = function(config) {

	if(config.email) {
		throw new Error("PagSeguro store email config undefined");
	}

	else if(config.token) {
		throw new Error("PagSeguro store token config undefined");
	}

	else {
		this.config = config;
	}
}

PagSeguroGateway.prototype.setBuyer = function(buyer) {
	return;
}

PagSeguroGateway.prototype.addItem = function(item) {
	return;
}

PagSeguroGateway.prototype.send = function(fn) {
	fn = fn || function(){};
	return;
}

exports = PagSeguroGateway;