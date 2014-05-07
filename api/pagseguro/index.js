var pagseguro = require('./lib/pagseguro');
var hat = require('hat');

module.exports = function(req, res) {

	var ref = hat();

	var buyer = {

		// required fields
		name: buyer.name,
		email: buyer.email,

		// optional fields
		phoneAreaCode: buyer.areaCode,
		phoneNumber: buyer.phoneNumber
	};

	res.json({
		result: 'success',
		pagseguro: {
			url: 'http://pagseguro.com.br/'
		}
	});
}