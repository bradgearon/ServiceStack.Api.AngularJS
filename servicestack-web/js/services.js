'use strict';
/* Services */

angular.module('myApp.services', ['ngResource', 'ngCookies'], function ($provide) {

	$provide.factory('Model', ['$resource', function ($resource) {
		var url = '/api/:service/:resource';
        var defaults = { };
		var actions = {
			test: { method: 'POST', isArray: false }
		};		
		var Model = $resource(url, defaults, actions);
		
		
		return Model;
	}]);
	 
});