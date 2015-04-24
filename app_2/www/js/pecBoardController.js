app.controller("pecBoardController", function($window, $scope, $stateParams, $location) {
    var pecboard_food = JSON.parse($window.localStorage.getItem("food"));
    $scope.pecBoardItems = pecboard_food;
    $scope.keys = Object.keys($scope.pecBoardItems);

    $scope.selected = {};
    $scope.selected.name = "________";

    $scope.changeSelected = function(selected) {
        $scope.selected.active = false;
        $scope.selected = selected;
        $scope.selected.active = true;
    }

    $scope.foodItemFilter = function(item) {
        if (item.image === "") {
            return false;
        }
        return true;
    }

    $scope.removeItem = function(item) {
        var pecboard_food = JSON.parse($window.localStorage.getItem("food"));
        delete(pecboard_food["food-" + item.id]);
        $window.localStorage.setItem("food", JSON.stringify(pecboard_food));

        $scope.pecBoardItems = pecboard_food;
        $scope.keys = Object.keys($scope.pecBoardItems);
    }
});