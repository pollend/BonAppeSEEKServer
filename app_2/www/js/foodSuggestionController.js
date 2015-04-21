app.controller("foodSuggestionController", function($window, $http, $scope, $stateParams, $location) {
    $scope.foods = [];


    $http.get(URL + 'rest/food?mealId=' + $stateParams.meal + '&featureId=' + $stateParams.feature, {}).
    success(function(data, status, headers, config) {
        console.log(data);
        $scope.foods = data.data;
    }).
    error(function(data, status, headers, config) {

    });


    $scope.viewFoodItem = function(id) {
        $location.url("/food/" + id);
    }
    $scope.togglePecBoard = function(food) {

        if (food.pecboard)
            food.pecboard = false;
        else
            food.pecboard = true;
    }
});