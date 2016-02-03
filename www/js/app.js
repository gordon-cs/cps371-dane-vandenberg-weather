'use strict';

// 'weather' is referenced in index.html, 2nd arg is dependencies
var app = angular.module('weather', ['ionic', 'ngResource']);

var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY',
    function($q, $resource, $http, FORECASTIO_KEY) {
	var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

	return {
	    getCurrentWeather: function(lat, lng) {
		return $http.jsonp(url + lat + ',' + lng +
				   '?callback=JSON_CALLBACK');
	    }
	}
    }
];

app.constant('FORECASTIO_KEY', '8f50ce160d42c89ee2f4b8a106c3d778');

app.controller('MainCtrl',
    function($scope,$state,WeatherData) {
	var latitude  = 42.589611;
	var longitude = -70.819806;

	//call getCurrentWeather method in factory
	WeatherData.getCurrentWeather(latitude,longitude).then(function(resp) {
	    $scope.current = resp.data;
	    console.log('GOT CURRENT', $scope.current);
	}, function(error) {
	    alert('Unable to get current conditions');
	    console.error(error);
	});
    }
);


app.directive('forecast', function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/forecast.html',
    link: function($scope, $element, $attr) {
    }
  }
});

app.directive('weatherBox', function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      title: '@'
    },
    template: '<div class="weather-box"><h4 class="title">{{title}}</h4><div ng-transclude></div></div>',
    link: function($scope, $element, $attr) {
    }
  }
});



app.factory('WeatherData', forecastioWeather);
