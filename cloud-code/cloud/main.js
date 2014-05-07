var orders = require('cloud/orders.js');

Parse.Cloud.define("hello", function(request, response) {
	response.success("Hello world!");
});