var x2js = require('cloud/payment/lib/xml2json.js');
var config = require('cloud/payment/config.js');

function PagSeguroModule(config) {

	console.log("pagseguro module init");

	if(config.email) {
		throw new Error("PagSeguro store email config undefined");
	}

	else if(config.token) {
		throw new Error("PagSeguro store token config undefined");
	}

	else {

		this.email = config.email;
		this.token = config.token;

		config.url = config.url || {};

		this.xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

		this.obj = new Object();
		this.obj['currency'] = config.currrency;		
		this.obj['redirectURL'] = config.url.redirect;
		this.obj['notificationURL'] = config.url.notification;

		return this;
	}
}

PagSeguroModule.prototype.setReference = function(ref) {
	this.obj['reference'] = ref;
}

PagSeguroModule.prototype.setBuyer = function(buyer) {

	this.obj['sender'] = new Object;

	this.obj.sender['name'] = obj.get("name");
	this.obj.sender['email'] = obj.get("email");

	return this;
}

PagSeguroModule.prototype.addItem = function(item) {

	if (!this.obj['items']) {
		this.obj['items'] = new Array;
	}

	this.obj.items.push({
		item: item
	});

	return this;
}

PagSeguroModule.prototype.send = function(fn) {

	fn = fn || function(){};

	var options;

	console.log(this.obj);

	options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/xml; charset=UTF-8'
		},
		body: body
	};

	Parse.Cloud.httpRequest({

		method: 'POST',
		url: "https://ws.pagseguro.uol.com.br/v2/checkout?email=" + this.email + "&token=" + this.token,

		body:  this.xml + x2js.	json2xml_str({
			checkout: this.obj
		}),

		success: function(httpResponse) {
			fn(null, xml2json(httpResponse.text));
		},

		error: function(httpResponse) {
			fn(xml2json(httpResponse.text));
		}
	});

	return;
}

exports = new PagSeguroModule({
	email: config.email, 
	token: config.token
});