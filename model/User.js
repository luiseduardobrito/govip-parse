var Parse = require('parse').Parse;

var User = Parse.User.extend({

	getName: function () {
		return this.get("name");
	}
	
}, {

	// Class methods
	getByToken: function(token, fn) {

		fn = fn || function(){};

		var query = new Parse.Query(Parse.User);
		query.equalTo('token', token);

		query.find({

			success: function(user) {

				if(user.length)
					fn(null, user[0]);
				else 
					fn(new Error("User not found"));
			},

			error: function(error) {
				fn(error);
			}
		})
	}
});
 
module.exports = User;