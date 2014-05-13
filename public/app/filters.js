var Filter = angular.module("go.filters", []).filter;

Filter('dateFilter', [function() {
	
	return function (list) {

		if(!list) return;

		var filtered_list = [];

		for (var i = 0; i < list.length; i++) {

			var today = new Date();

			for (var j=0; j < list[i].items.length; j++) {
				if(list[i].items[j]) {
					var startDate = new Date(list[i].items[j].startDate);
					var endDate = new Date(list[i].items[j].endDate);

					if ((startDate <= today) && (endDate >= today)) {
						filtered_list.push(list[i]);
						break;
					}
				}
			}
		}
		return filtered_list;
	}

}])