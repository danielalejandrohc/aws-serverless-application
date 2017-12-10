(function(angular) {
  'use strict';

  // This will be invoked once per page
  var app = angular.module('ngAppDemo', []);

  app.factory('GlobalUtility', function() {
    return {
        fieldsType : ["text", "number", "date", "currency", "enum"],
        baseServiceURL: "https://dmirjz2xl4.execute-api.us-east-1.amazonaws.com/production",
        // Function to get the .sv icon base on a key value
        findSVG: function(key) {

          var iconsSvg = {
            "text":"text.svg",
            "number":"number.svg",
            "date":"calendar.svg",
            "currency":"currency.svg",
            "enum":"enum.svg",
            "refresh":"refresh.svg"
          };

          return iconsSvg[key];
        }
    };
  });

})(window.angular);
