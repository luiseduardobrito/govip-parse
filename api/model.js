var Model = function(name) {
	return require('../model/' + name);
}

module.exports = Model;