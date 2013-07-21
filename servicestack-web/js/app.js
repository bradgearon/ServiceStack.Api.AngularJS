'use strict';
// Declare app level module which depends on filters, and services 
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ui.bootstrap'])
.config(['$provide', '$routeProvider', '$locationProvider', function ($provide, $routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', { templateUrl: 'partials/meta.html', controller: MetaCtrl });
}]);
