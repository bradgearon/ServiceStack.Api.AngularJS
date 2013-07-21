'use strict';
/* Services */

angular.module('myApp.services', ['ngResource', 'ngCookies'], function ($provide) {
    $provide.factory('Model', ['$resource', '$http', function ($resource, $http) {
        var url = '/api/:service/:resource';
        
        var defaults = {};
        var actions = {
            update: { method: 'PUT' }
        };

        var Model = $resource(url, defaults, actions);
        
        Model.prototype.doAction = function (url, action, requestCb) {
            if (typeof requestCb === 'function') {
                $http.defaults.transformRequest.push(requestCb);
            }
            return $resource(url, defaults, actions)[action];
        };

        return Model;
    }]);
});