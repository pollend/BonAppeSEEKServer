//https://github.com/fatlinesofcode/ngDraggable

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngDraggable'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        url: "/home",
        templateUrl: "templates/home.html"
    });

    $stateProvider.state('pecboard', {
        url: "/pecboard",
        templateUrl: "templates/pecboard.html",
        controller: "pecBoardController"
    });

    $stateProvider.state('criteria', {
        url: "/criteria",
        templateUrl: "templates/criteria.html",
        controller: "criteriaController"
    });

    $stateProvider.state('food-view', {
        url: "/food/:foodId",
        templateUrl: "templates/food.html",
        controller: "foodController"
    });

    $stateProvider.state('foodSuggestion-view', {
        url: "/foodSuggestion/:meal/:feature",
        templateUrl: "templates/foodSuggestion.html",
        controller: "foodSuggestionController"
    });

    $stateProvider.state('help', {
        url: "/help",
        templateUrl: "templates/help.html",
    });

    $stateProvider.state('about', {
        url: "/about",
        templateUrl: "templates/about.html",
    });
});

// if none of the above states are matched, use this as the fallback
/*$urlRouterProvider.otherwise('/tab/dash');

});*/