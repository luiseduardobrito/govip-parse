var Ticket = Parse.Object.extend("Ticket", {

	// Instance methods
	setAsUsed: function (opt, fn) {
		return;
	}

}, {

	// Class methods
	emit: function(opt, fn) {

		var fn = fn || function(){};
		var opt = opt || {};

		var ticket = new Ticket();

		ticket.save(opt, {

			success: function(t) {
				return fn.success ? fn.success(t) : fn(null, t);
			},

			error: function(t, error) {
				return fn.error ? fn.error(error) : fn(error);
			}
		});
	}
});

module.exports = Ticket;