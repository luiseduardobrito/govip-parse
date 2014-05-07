
/**
 * Module dependencies.
 */

var Parse = require('parse').Parse;
var express = require('express');
var http = require('http');
var path = require('path');
var api = require('./api/router');

var app = express();
app.set('title', 'GoVip');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

api.router(app);

http.createServer(app).listen(app.get('port'), function(){
  Parse.initialize('GL1SDhT31Mf1r6uizWHOTXCuM4Mc4uPGWvcNL0eP', 'Y6SVRS3W0PSMWWO0mS6wJ2XlVo728UC6MBhwaWB0');
  console.log('Parse initialized successfully!');
  console.log('Express server listening on port ' + app.get('port'));
});
