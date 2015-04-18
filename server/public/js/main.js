var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/public/html/templates/home.html',
            controller: 'home'
        });

    }
]);