var DATE_INFINITY = 150000000000000;
var DATE_ZERO = 0;

var Services = angular.module("go.services", []).factory;

Services("$Parse", [function() {
	Parse.initialize("GL1SDhT31Mf1r6uizWHOTXCuM4Mc4uPGWvcNL0eP", "Y6SVRS3W0PSMWWO0mS6wJ2XlVo728UC6MBhwaWB0");
	return Parse;
}]);

Services("$user", ['$Parse', function($Parse) {

	var User = $Parse.User.extend({
	
		// Instance methods
		initialize: function (attrs, options) {
			return;
		}

	}, {

		// Class methods
		me: function(fn) {
			return $Parse.User.current();
		},

		logout: function() {
			$Parse.User.logOut();
		},

		signup: function(opt, fn) {

			if(!opt.name) {
				fn(new Error("User name not defined"));
			}

			else if(!opt.email) {
				fn(new Error("User email not defined"));
			}

			else if(!opt.password) {
				fn(new Error("User password not defined"));
			}

			else {

				var user = new $Parse.User();

				// Login information
				user.set("username", opt.email);
				user.set("password", opt.password);

				// User information
				user.set("name", opt.name);
				user.set("email", opt.email);
				
				// Perform signup			
				user.signUp(null, {

					success: function(user) {
						(fn.success ? fn.success(user) : fn(null, user));
					},

					error: function(user, error) {
						(fn.error ? fn.error(error) : fn(error));
					}
				});
			}

		},

		login: function(opt, fn) {

			fn = fn || function(){};

			if(!opt.email) {
				fn(new Error("User email not defined"));
			}

			else if(!opt.password) {
				fn(new Error("User password not defined"));
			}

			else {

				// Perform user login
				Parse.User.logIn(opt.email, opt.password, {

					success: function(user) {
						(fn.success ? fn.success(user) : fn(null, user));
					},

					error: function(user, error) {
						(fn.error ? fn.error(error) : fn(error));
					}
				});
			}
		},

		facebookLogin: function(fn) {

			fn = fn || function(){};

			// Perform facebook login
			$Parse.FacebookUtils.logIn("public_profile,email,user_friends", {

				success: function(user) {
					console.log(user);
					(fn.success ? fn.success(user) : fn(null, user));
				},

				error: function(user, error) {
					(fn.error ? fn.error(error) : fn(error));
				}
			});
		},

		resetPassword: function(email, fn) {

			fn = fn || function(){};

			$Parse.User.requestPasswordReset(email, {

				success: function() {
					(fn.success ? fn.success() : fn())
				},

				error: function(error) {
					(fn.error ? fn.error(error) : fn(error))
				}
			});
		}
	});

	window.fbAsyncInit = function() {
		Parse.FacebookUtils.init({
			appId: '623325864408977'
		});
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = '//connect.facebook.net/en_US/all.js';
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	return User;
}]);

Services('$item', ['$Parse', function($Parse) {

	var Item = $Parse.Object.extend('Item', {

		isAvailable: function() {
			var n = Date.now();
			var s = (new Date(this.get("startDate") || DATE_INFINITY)).getTime();
			var e = (new Date(this.get("endDate") || DATE_ZERO)).getTime();
			return (n >= s) && (n <= e);
		}

	}, {

		findByEvent: function(e, fn) {

			fn = fn || function(){};

			var query = new $Parse.Query(Item);
			query.equalTo('event', e);

			query.find({

				success: function(list) {
					(fn.success ? fn.success(list) : fn(null, list));
				},

				error: function(error) {
					(fn.error ? fn.error(error) : fn(error));
				}
			});
		}

	});

	return Item;

}]);

Services('$event', ['$Parse', '$item', function($Parse, $item){
	
	var Event = $Parse.Object.extend('Event', {

		isAvailable: function(fn) {

			$item.findByEvent(this, {

				success: function(list) {

					var result = false;

					for(var i = 0; i < list.length; i++) {

						if(list[i].isAvailable()) {
							result = true;
							break;
						}
					}

					(fn.success ? fn.success(result) : fn(null, result));
				},

				error: function(error) {
					(fn.error ? fn.error(error) : fn(error, nul));
				}
			});

			return false;
		},

		getDisplayDate: function() {
			return moment(this.get('date')).format('ddd, hA');
		}

	}, {

		getList: function(fn) {
			
			fn = fn || function(){};
			var query = new Parse.Query(Event);

			query.find({

				success: function(results) {
					(fn.success ? fn.success(results) : fn(null, results));
				},

				error: function(error) {
					(fn.error ? fn.error(error) : fn(error));
				}
			});
		}
	});

	return Event;
}]);

Services('$order', ['$Parse', function($Parse) {
	return $Parse.Object.extend('Order');
}]);

Services('$ticket', ['$Parse', function($Parse) {
	return $Parse.Object.extend('Ticket');
}]);