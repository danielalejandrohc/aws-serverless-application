(function(angular) {
  'use strict';

  // Notice: do not pass the parameter [] since should be only use it once per page load
  var app = angular.module('ngAppDemo');
	app.controller('riskDataController', function($scope, $timeout, GlobalUtility, $http) {
    // Variable use it for displaying messages at the top
	  $scope.riskData = [];

    $scope.riskSelected = {
      "code": "",
      "riskName": "",
      "fields": []
    };

    // It returns a value from a key in the Icon SVG array
	  $scope.getProperty = function(name) {
		    return GlobalUtility.findSVG(name);
	  }

    $scope.selectRisk = function(risk) {
		    $scope.riskSelected = risk;
	  }

    // Load the data of the entities we have created
    $scope.loadData = function() {
      console.log('invoking ' + GlobalUtility.baseServiceURL + "/entities")
      try {
        $http.get(GlobalUtility.baseServiceURL + "/entities").
          then(function(response) {
              console.log('reading: ' + response.data.Items);
              $scope.riskData = response.data.Items;
          });
      } catch(err) {
        console.log('error ' + err)
      }
    }

	});
})(window.angular);
