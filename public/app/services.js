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

		logout: function(fn) {
			$Parse.User.logOut();
			fn();
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

					FB.api("/me", {

						access_token: user.get("authData").facebook.access_token

					}, function(me) {

						if(!user.existed()) {

							var info = {
								name: me.name,
								email: me.email
							};

							user.save(info, {

								success: function(_user) {
									(fn.success ? fn.success(_user) : fn(null, _user));
								},

								error: function(_error) {
									(fn.error ? fn.error(_error) : fn(_error));
								}
							});
						}

						(fn.success ? fn.success(user) : fn(null, user));
					})
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
			query.include("event");

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
		},

		findById: function(id, fn) {

			var query = new Parse.Query(Event);

			query.include("admin");
			query.get(id, {

				success: function(e) {
					(fn.success ? fn.success(e) : fn(null, e));
				},

				error: function(error) {
					(fn.error ? fn.error(error) : fn(error));
				}
			});
		}
	});

	return Event;
}]);

Services('$attendee', ['$Parse', function($Parse) {
	return $Parse.Object.extend('Attendee');
}]);

Services('$order', ['$Parse', '$attendee', function($Parse, $Attendee) {

	var Order = $Parse.Object.extend('Order', {

	}, {

		create: function(opt, fn) {

			opt = opt || function(){};
			var order = new Order();

			var s = [];
			var t = 0;

			function createAttendee(opt, callback) {

				var a = new $Attendee();

				t += opt.item.get('value') || 0;

				a.set("name", opt.attendee.name);
				a.set("document", opt.attendee.document);
				a.set("item", opt.item);
				a.set("order", order);

				a.save({
					success: function(a) {
						callback(null, a)
					},
					error: function(err) {
						callback(err);
					}
				});
			}

			for(var i = 0; i < opt.items.length; i++) {
				s.push(async.apply(createAttendee, opt.items[i]));
			}

			async.parallel(s, function(err, results){

				if(err) {
					console.error(err);
				}

				order.set('buyer', opt.buyer);

				order.save({
					total: t
				}, {

					success: function(order) {
						(fn.success ? fn.success(order, results) : fn(null, order, results));
					},

					error: function(error) {
						(fn.error ? fn.error(error) : fn(error));
					}
				});
			});

			return order;
		},

		place: function(order, attendees, fn) {

			fn = fn || function(){};

			var user = Parse.User.current();

			$Parse.Cloud.run('paymentGateway', {

				order: order.id.toString(),
				buyer: {
					name: user.get("name"),
					email: user.get("email")
				}

			}, {

				success: function(payment) {
					fn.success ? fn.success(payment) : fn(null, payment);
				},

				error: function(error) {
					fn.error ? fn.error(error) : fn(error);
				}
			})
		}

	});

	return Order;

}]);

Services('$ticket', ['$Parse', function($Parse) {
	return $Parse.Object.extend('Ticket');
}]);