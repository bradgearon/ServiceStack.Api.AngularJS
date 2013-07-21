'use strict';
/* Services */

angular.module('myApp.services', ['ngResource', 'ngCookies'], function ($provide) {
    $provide.factory('Model', ['$resource', function ($resource) {
        var url = '/api/:service/:resource';

        var defaults = {};
        var actions = {
            update: { method: 'PUT' }
        };

        var Model = $resource(url, defaults, actions);

        Model.prototype.doAction = function (url, action, params, cb) {
            angular.extend(defaults, params);
            return $resource(url, defaults, actions, cb)[action];
        };

        return Model;
    }]);
});