var Model = require('../model');

var Order = Model('Order');
var Item = Model('Item');
var User = Model('User');

module.exports = function(req, res) {

	User.getByToken(req.param('token'), function(err, me) {

		if(err) {
			return res.json({
				result: 'error'
			})
		}

		else {
			return res.json({
				result: 'success',
				user: me
			})	
		}

	});
}
