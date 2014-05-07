var Util = function(){
	return;
}

Util.prototype.parseRequest = function(req, fields, fn) {

	fn = fn || function() {};

	var result = {};
	var errors = [];

	fields = fields || {};
	fields.required = fields.required || [];
	fields.optional = fields.optional || [];

	// Required fields
	for(var i = 0; i < fields.required.length; i++) {

		var key = fields.required[i].toString();
		var value = req.param(key);

		if(!value) {
			errors.push(key);
		}

		else {
			result[key] = value;
		}
	}

	// Optional fields
	for(var i = 0; i < fields.optional.length; i++) {

		var key = fields.optional[i].toString();
		var value = req.param(key);

		if(value) {
			result[key] = value;
		}
	}

	fn(errors, result);
}

module.exports = new Util;