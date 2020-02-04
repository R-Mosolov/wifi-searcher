angular.module('wifiSearcher', ['ngRoute']);

function config($routeProvider) {
    $routeProvider
        .when('/', {})
        .otherwise({
            redirectTo: '/'
        });
}

angular
    .module('wifiSearcher')
    .config(['$routeProvider'], config);
