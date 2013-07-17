'use strict';
/* Controllers */
var inject = ['$scope', '$location', 'Model', '$routeParams', '$cookies'];

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {

}
MyCtrl2.$inject = [];

function MetaCtrl($scope, $location, Model, $routeParams, $cookies) {
	$scope.getBtnMethod = function(btn) {
		switch(btn){
			case "PUT": 
				return "label-success";
			case "POST":
				return "label-warning";
			case "GET":
				return "label-info";
			case "DELETE":
				return "label-important";
			default:
				return "label";
		}
	}

	$scope.metadata = Model.get({ service: 'resources' }, function (response){ 
		
		for(var i = 0; i < response.apis.length; i++){
			response.apis[i].name = $(response.apis[i].path.split('/')).last().get(0);
			$scope.metadata.apis[i].resource = Model.get({ service: 'resource', resource: response.apis[i].name });
		}
	});
}

MetaCtrl.$inject = inject; 