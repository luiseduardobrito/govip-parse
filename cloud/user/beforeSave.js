var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};

var BeforeSave = function(request, response) {
	
	request.object.set('token', token());

	if(request.object.get('producer') === null)
		request.object.set('producer', true);

	return response.success();
}

Parse.Cloud.beforeSave(Parse.User, BeforeSave);
exports = BeforeSave;