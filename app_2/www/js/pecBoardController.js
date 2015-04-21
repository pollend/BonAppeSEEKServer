app.controller("pecBoardController", function($window, $scope, $stateParams, $location) {
    var pecboard_food = JSON.parse($window.localStorage.getItem("food"));
    $scope.pecBoardItems = pecboard_food;
    $scope.keys = Object.keys($scope.pecBoardItems);

    $scope.whatIWant = "___________";

    $scope.changeSelected = function(selected) {
        $scope.whatIWant = selected;
    }
});