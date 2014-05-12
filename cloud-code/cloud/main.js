var order = require('cloud/order/main.js');
var user = require('cloud/user/main.js');

Parse.Cloud.define("hello", function(request, response) {
	response.success("Hello world!");
});
