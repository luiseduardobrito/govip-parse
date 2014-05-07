var Parse = require('parse').Parse;

module.exports = function(req, res) {

	Parse.Cloud.run('hello', {}, {

		success: function(result) {

			return res.json({
				result: 'success', 
				response: result
			});
		},
		
		error: function(error) {

			return res.json({
				result: 'error', 
				response: error
			});
		}
	});
}