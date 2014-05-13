var beforeSave = require('cloud/ticket/beforeSave.js');
var afterSave = require('cloud/ticket/afterSave.js');
var emit = require('cloud/ticket/emit.js');
var model = require('cloud/ticket/model.js');

var TicketCloud = function() {}

TicketCloud.prototype.beforeSave = require('cloud/ticket/beforeSave.js');

exports = new TicketCloud();