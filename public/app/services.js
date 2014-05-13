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
			$Parse.FacebookUtils.logIn(null, {

				success: function(user) {
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
					(fn.success ? fn.success() : fn(), else fn())
				},

				error: function(error) {
					(fn.error ? fn.error(error) : fn(), else fn(error))
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
		js.src = "//connect.facebook.net/en_US/all.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	return User;
}]);

Services("$order", ["$Parse", function($Parse) {

	var _this = this;
	var _public = {};

	_this.me = null;

	_this.init = function() {
		return _public;
	}

	return _this.init();
}])

Services("$event", ["$Parse", function($Parse){

	var _this = this;
	var _public = {};

	_this.me = null;

	_this.init = function() {
		return _public;
	}

	return _this.init();
}]);