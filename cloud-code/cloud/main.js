var order = require('cloud/order/main.js');
var user = require('cloud/user/main.js');
var ticket = require('cloud/ticket/main.js');
var payment = require('cloud/payment/main.js');

Parse.Cloud.define("hello", function(request, response) {
	response.success("Hello world!");
});
