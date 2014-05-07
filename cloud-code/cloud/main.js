var orders = require('cloud/orders.js');
var users = require('cloud/users.js');

Parse.Cloud.define("hello", function(request, response) {
	response.success("Hello world!");
});