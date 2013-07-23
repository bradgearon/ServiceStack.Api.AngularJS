'use strict';
/* Controllers */
var inject = ['$scope', '$location', 'Model', '$routeParams', '$cookies', '$interpolate', '$http'];

/* if webapi
var docService = 'docs';
var docResource = 'docs';
*/

var docService = 'resources';
var docResource = 'resource';

function MetaCtrl($scope, $location, Model, $routeParams, $cookies, $interpolate, $http) {

    $scope.resourceClass = {
        "GET": "info",
        "POST": "success",
        "PUT": "warning",
        "DELETE": "important",
        "QUERY": "info"
    };

    var resourceFn = {
        "GET": 'get',
        "POST": 'save',
        "PUT": 'update',
        "DELETE": 'delete',
        'QUERY': 'query'
    };

    var alertStatus = {

    };

    $scope.submitModel = function (pathFn, action, model, query, op) {
        var url = pathFn(query);
        var svc = new Model();

        op.request = {};
        op.response = {};

        if (action != 'GET') {
            angular.extend(svc, model);
        }

        var transformRequest = function (fn, headerFn) {
            op.request.headers = headerFn();
            op.request.url = url;
        };

        svc.doAction(url, resourceFn[action], transformRequest)(model,
            function (result, headers) {
                op.response.typeof = typeof result;
                op.response.data = result;
                op.response.headers = headers();
            },
            function (error) {
                op.response.error = {
                    data: error.data,
                    headers: error.headers(),
                    status: error.status
            };
        });

    };

    var expandAll = function (api) {
        $(api.resource.apis).each(function () {
            var thisApi = this;
            thisApi.collapse = true;
            $(thisApi.operations).each(function () {
                this.open = api.expandAll;
            });
        });
    }

    $scope.expandAll = function (api) {
        api.expandAll = !api.expandAll;
        expandAll(api);
    }

    $scope.listAll = function (api) {
        api.expandAll = false;
        expandAll(api);
    }

    $scope.metadata = Model.get({ service: docService }, function (response) {
        for (var i = 0; i < response.apis.length; i++) {
            var basePath = response.basePath;
            response.apis[i].name =
                $(response.apis[i].path.split('/')).last().get(0);

            var resource = {
                service: docResource,
                resource: response.apis[i].name
            };

            $scope.metadata.apis[i].resource = Model.get(resource, function (response) {
                angular.forEach(response.apis, function (api) {
                    var url = response.basePath + api.path.replace(/\{([^{}*]*)\*?\}/, '{{$1}}');
                    api.pathFn = $interpolate(url);
                    angular.forEach(api.operations, function (operation) {
                        if (operation.httpMethod == 'GET'
                            && operation.responseClass
                            && operation.responseClass.indexOf('[') > 0) {
                            operation.httpMethod = 'QUERY';
                        }
                        operation.queryParameters = [];
                        angular.forEach(api.pathFn.parts, function (part) {
                            if (typeof part === 'function') {
                                var prop = {
                                    name: part.exp,
                                    dataType: 'text',
                                    paramType: 'query',
                                    required: false
                                };
                                operation.queryParameters.push(prop);
                            }
                        });

                    });
                });
            });
        }
    });
}

MetaCtrl.$inject = inject;