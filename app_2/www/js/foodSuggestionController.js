app.controller("foodSuggestionController", function($window, $http, $scope, $stateParams, $location) {
    $scope.foods = {};

    var pecboard_food = JSON.parse($window.localStorage.getItem("food"));

    $http.get(URL + 'rest/food?mealId=' + $stateParams.meal + '&featureId=' + $stateParams.feature, {}).
    success(function(data, status, headers, config) {
        console.log(data);
        for (var i = 0; i < data.data.length; i++) {
            if (!pecboard_food.hasOwnProperty("food-" + data.data[i].id)) {
                $scope.foods["food-" + data.data[i].id] = {
                    entry: data.data[i],
                    pecboard: true
                };
            } else {
                $scope.foods["food-" + data.data[i].id] = {
                    entry: data.data[i],
                    pecboard: false
                };
            }
        };

        //$scope.foods = data.data;
    }).error(function(data, status, headers, config) {

    });


    $scope.viewFoodItem = function(id) {
        $location.url("/food/" + id);
    }
    $scope.togglePecBoard = function(key, food) {
        var data = $window.localStorage.getItem("food");
        var out;
        try {
            out = JSON.parse(data);

            if (food.pecboard) {
                out[key] = food.entry;
                food.pecboard = false;
            } else {
                delete out[key];
                food.pecboard = true;
            }
        } catch (e) {
            out = {};
        }
        $window.localStorage.setItem("food", JSON.stringify(out));
    }
});