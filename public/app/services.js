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
		return _public;
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