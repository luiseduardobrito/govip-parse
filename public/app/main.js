// Declare app level module which depends on filters, and services
var go = angular.module('go', [
	'ngRoute',
	'go.controllers',
	'go.services',
	'go.directives',
	'go.filters'
]);

go.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.
			when('/', {
				templateUrl: 'views/home.html', 
				controller: 'HomeCtrl'
			})

			.when('/home', {
				redirectTo: '/'
			})

			.when('/entrar', {
				templateUrl: 'views/auth.html', 
				controller: 'AuthCtrl'
			})

			.when('/sobre', {
				templateUrl: 'views/about.html', 
				controller: 'AboutCtrl'
			})

			.when('/eventos', {
				templateUrl: 'views/list.html', 
				controller: 'ListCtrl'
			})

			.when('/conta', {
				templateUrl: 'views/email.html', 
				controller: 'EmailCtrl'
			})

			.when('/carrinho/:id', {
				templateUrl: 'views/order.html', 
				controller: 'OrderCtrl'
			})

			.when('/termos', {
				templateUrl: 'views/terms.html', 
				controller: 'TermsCtrl'
			})

			.when('/sucesso', {
				templateUrl: 'views/success.html', 
				controller: 'SuccessCtrl'
			})

			.otherwise({
        		redirectTo: '/'
      		});

	// Main route
	// $routeProvider.when('/', {templateUrl: 'views/home.html', controller: 'HomeCtrl'});

	// Application sections
	// $routeProvider.when('/home', {redirectTo: '/'});
	// $routeProvider.when('/sobre', {templateUrl: 'views/about.html', controller: 'AboutCtrl'});
	// $routeProvider.when('/eventos', {templateUrl: 'views/list.html', controller: 'ListCtrl'});
	// $routeProvider.when('/carrinho/:id', {templateUrl: 'views/order.html', controller: 'OrderCtrl'});
	// $routeProvider.when('/termos', {templateUrl: 'views/terms.html', controller: 'TermsCtrl'});

	// Default 404 route
	// $routeProvider.otherwise({redirectTo: '/erro'});

	$locationProvider
		.html5Mode(false)
		.hashPrefix('!');
}]);