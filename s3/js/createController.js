(function(angular) {
  'use strict';

  // Notice: do not pass the parameter [] since should be only use it once per page load
  var app = angular.module('ngAppDemo');
	app.controller('ngAppDemoController', function($scope, $timeout, GlobalUtility, $http) {
    // Variable use it for displaying messages at the top
	  $scope.notify = false;
    // success, info, warning, danger
    $scope.notificationType = "success";
    // Message to be displayed as notification
    $scope.message = ""

    // Type of fields
	  $scope.fieldsType = GlobalUtility.fieldsType;
    // option
    $scope.option = ""

    // Risk JSON format to handle the risk and it generic fields
    $scope.risk = {
		  "riskName": "",
      "fields": []
	  };

    // Variable use it to store new fields
    $scope.newField = {
		  "fieldName": "",
		  "fieldType": "",
      "options": []
	  };

    // It returns a value from a key in the Icon SVG array
	  $scope.getProperty = function(name) {
		    return GlobalUtility.findSVG(name);
	  }

	  // All data of risks
	  $scope.riskData = []

    // Method invoked when adding a new field to a risk
	  $scope.addField = function() {
		  // Validation
		  if($scope.newField.fieldName == "" || $scope.newField.fieldType == "") {
  			$scope.notificationType = "danger"
  			$scope.notify = true;
  			$scope.message = "Missing fields"
  			// Hide
  			$timeout(function () {
  				  $scope.notify = false;
  			}, 1500);
  			return;
		  }
		  // Show
		  $scope.notificationType = "success"
		  $scope.message = "Field added"
		  $scope.notify = true;
		  $scope.risk.fields.push($scope.newField);
		  $scope.newField = {
				  "fieldName": "",
				  "fieldType": "",
          "options": []
			};
		  // Hide
		  $timeout(function () {
			  $scope.notify = false;
		  }, 1500);
	  };

    // Method invoked when adding a new field to a risk
    $scope.addOption = function() {
      $scope.newField.options.push($scope.option);
      $scope.option = ""
      $scope.$apply()
    }

    // Method invoked when adding a new risk
    $scope.createRisk = function() {
      //$scope.riskData.push($scope.risk);
      $http.put(GlobalUtility.baseServiceURL + "/entities", $scope.risk);
      $scope.risk = {
  		  "riskName": "",
        "fields": []
  	  };
    }

	});
})(window.angular);
