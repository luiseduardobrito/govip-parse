var PagSeguro = require('cloud/payment/pagseguro.js');
var config = require('cloud/payment/config.js');

var PaymentGatewayCloud = function() {

	// Check config gateway
	if( g.toLowerCase() !== "pagseguro") {
		throw new Error("Only PagSeguro gateway currently supported");
	}

	// Create new gateway instance
	this.gateway = new PagSeguro({
		email: config.email, 
		token: config.token
	});
};

PaymentGatewayCloud.prototype.setOrder = function(order) {

	// Save information instance
	this.order = order;
	this.buyer = order.get("buyer");

	// TODO: fill gateway with order info
	return;
}

PaymentGatewayCloud.prototype.send = function(fn) {
	this.gateway.send(fn || function(){});
}

exports = PaymentGatewayCloud;