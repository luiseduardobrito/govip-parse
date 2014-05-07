var pagseguro = require('./lib/pagseguro');
var hat = require('hat');
var ApiUtil = require('../util');

module.exports = function(req, res) {

	var fields = {
		required: ['name', 'email'],
		optional: ['areaCode', 'phoneNumber']
	}

	ApiUtil.parseRequest(req, fields, function(err, input) {

		if(err && err.length) {

			return res.json({
				result: 'error',
				message: 'missing required fields',
				fields: err
			})
		}

		else {

			var ref = hat();

			var buyer = {

				// required fields
				name: input.name,
				email: input.email,

				// optional fields
				phoneAreaCode: input.areaCode,
				phoneNumber: input.phoneNumber
			};

			res.json({
				result: 'success',
				pagseguro: {
					url: 'http://pagseguro.com.br/'
				}
			});
		}
	});
}