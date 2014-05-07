var fs = require("fs");
var path = require("path");

var API_PREFIX = '/api';

var ApiRouter = function() {
	
	// Get all directory files and folders
	this.routes = fs.readdirSync(__dirname);

	// Filter for folders only
	this.routes = this.routes.map(function (file) {
		return file;
	}).filter(function (file) {
		return !fs.statSync(path.join(__dirname, file)).isFile();
	});
};

ApiRouter.prototype.prepareFullRoute = function(route) {

	if(route === 'index') {
		return API_PREFIX;
	}

	else {
		return API_PREFIX + '/' + route;
	}
}

ApiRouter.prototype.bindGetRoute = function(route, app) {

	try {

		var index_path = './' + route + '/index.js';
		var get_path = './' + route + '/get.js';
		var post_path = './' + route + '/post.js';

		var indexIsSet = false;

		// Index path
		if (fs.existsSync(path.join(__dirname, index_path))) {

			indexIsSet = true;

			var r = this.prepareFullRoute(route);
			var ctrl = require(index_path)
			app.get(r, ctrl);
		}

		// GET path
		else if(!indexIsSet && fs.existsSync(path.join(__dirname, get_path))) {

			indexIsSet = true;

			var r = this.prepareFullRoute(route);
			app.get(r, require(get_path));
		}

		// POST path
		if(fs.existsSync(path.join(__dirname, post_path))) {

			indexIsSet = true;

			var r = this.prepareFullRoute(route);
			app.post(r, require(post_path));
		}

	} catch(e) {

		console.log('Error binding route \'' + route + '\': ' + e.message || e.toString());
		throw e;
	}
}

ApiRouter.prototype.router = function(app) {

	this.routes = this.routes || [];

	if(this.routes.length < 1) {
		console.log('API: no api routes defined...');
	}

	for(var i = 0; i < this.routes.length; i++) {
		this.bindGetRoute(this.routes[i], app);
	}
};

module.exports = new ApiRouter();