var Directives = angular.module("go.directives", []).directive;

Directives('ngGoto', ['$location', '$anchorScroll', function($location, $anchorScroll){
	return {
		restrict: 'A',
		link: function ($scope, $element, $attrs) {
			$element.bind('click', function() {
				$scope.$apply(function(){
					$location.path($attrs.ngGoto);
					jQuery.scrollTo(0);
				});
			});
		}
	};
}]);