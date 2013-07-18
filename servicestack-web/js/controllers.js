'use strict';
/* Controllers */
var inject = ['$scope', '$location', 'Model', '$routeParams', '$cookies', '$parse'];

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {

}
MyCtrl2.$inject = [];

function MetaCtrl($scope, $location, Model, $routeParams, $cookies, $parse) {
	
	$scope.resourceClass = {
		"GET": "info",
		"POST": "success",
		"PUT": "warning",
		"DELETE": "important"
	};

	var resourceFn = {
	    "GET": 'get',
	    "POST": 'save',
	    "PUT": 'update',
	    "DELETE": 'delete'
	};

	$scope.submitModel = function (model, action, path) {
	    var cleanPath = path.replace(/\{/g, ':');
	    $scope.results = Model[resourceFn[action]]({ service: cleanPath }, model);
	    
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

	$scope.metadata = Model.get({ service: 'resources' }, function (response){ 
	    for (var i = 0; i < response.apis.length; i++) {

	        response.apis[i].name =
                $(response.apis[i].path.split('/')).last().get(0);

	        $scope.metadata.apis[i].resource =
                Model.get({ service: 'resource', resource: response.apis[i].name });
		}
	});
}

MetaCtrl.$inject = inject; 