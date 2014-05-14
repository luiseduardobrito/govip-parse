var PagSeguro = require('cloud/payment/lib/pagseguro.js');
var config = require('cloud/payment/config.js');

var PaymentGatewayCloud = function(g) {

	g = g || "pagseguro";

	// Check config gateway
	if(g.toLowerCase() !== "pagseguro") {
		throw new Error("Only PagSeguro gateway currently supported");
	}

	// Create new gateway instance
	this.gateway = new PagSeguro({
		email: config.email, 
		token: config.token
	});
};

PaymentGatewayCloud.prototype.setOrder = function(order) {

	// Set order id reference
	this.gateway.setReference(order.get("objectId"));

	// Set buyer user instance
	// Required user fields: name, email
	this.gateway.setBuyer(order.get("buyer"));
}

PaymentGatewayCloud.prototype.send = function(fn) {
	this.gateway.send(fn || function(){});
}

exports = PaymentGatewayCloud;