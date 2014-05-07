var Pagseguro = function() {
	this.config = require('../config') || {};
	this.lib = require('./lib');
}

Pagseguro.prototype.init = function(reference, buyer) {

	// Initialize pagseguro gateway
	this.gateway = new lib(this.config.email, this.config.token);
	this.gateway.setRedirectURL(this.config.redirectURL);
	this.gateway.setNotificationURL(this.config.notificationURL);
	this.gateway.currency('BRL');

	// Prepare order reference
	this.gateway.reference(reference);

	// Prepare buyer information
	this.gateway.buyer({
		name: buyer.name,
		email: buyer.email,
		phoneAreaCode: buyer.areaCode,
		phoneNumber: buyer.phoneNumber
	});
};

Pagseguro.prototype.addItem = function(item) {

	this.gateway.addItem({
		id: item.id,
		description: item.description,
		amount: item.ammount,
		quantity: item.quantity
	});
}

Pagseguro.prototype.addMultipleItems = function(items) {
	for(var i = 0; i < items.length; i++)
		this.addItem(items[i]);
}

Pagseguro.prototype.finish = function(fn) {
	this.gateway.send(fn);
}

module.exports = new Pagseguro();