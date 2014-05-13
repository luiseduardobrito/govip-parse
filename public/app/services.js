var Services = angular.module("go.services", []).factory;

Services("$Parse", [function() {
	Parse.initialize("GL1SDhT31Mf1r6uizWHOTXCuM4Mc4uPGWvcNL0eP", "Y6SVRS3W0PSMWWO0mS6wJ2XlVo728UC6MBhwaWB0");
	return Parse;
}]);

Services("$user", ['$Parse', function($Parse) {

	var _this = this;
	var _public = {};

	_this.me = null;

	_this.init = function() {

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

		return _public;
	}

	_public.facebookLogin = function() {
		
		Parse.FacebookUtils.logIn(null, {
			success: function(user) {
				if (!user.existed()) {
					alert("User signed up and logged in through Facebook!");
				} else {
					alert("User logged in through Facebook!");
				}
			},
			error: function(user, error) {
				alert("User cancelled the Facebook login or did not fully authorize.");
			}
		});
	}

	return _this.init();

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