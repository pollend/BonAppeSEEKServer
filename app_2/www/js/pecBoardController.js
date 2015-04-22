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
});