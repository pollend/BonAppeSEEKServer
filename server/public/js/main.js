var app = angular.module("application", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: '/public/html/views/home.html',
            controller: 'homeController'
        });
    $routeProvider.when('/p', {
        templateUrl: '/public/html/views/userHome.html',
        controller: 'userHomeController'
    });
        $locationProvider.html5Mode(true);
    }
]);


//var controller = angular.module('controller', []);

/*.when('/p', {
            templateUrl: '/public/html/templates/userHome.html',
            controller: 'userHomeController'
        });*/