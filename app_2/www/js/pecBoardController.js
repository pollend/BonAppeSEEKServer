app.controller("pecBoardController", function($window, $scope, $stateParams, $location) {
    var pecboard_food = JSON.parse($window.localStorage.getItem("food"));
    $scope.pecBoardItems = pecboard_food;

    $scope.onDropComplete = function(data, evt) {
        console.log("drag success, data:", evt);
        $scope.pecBoardItems[data].x = evt.x;
        $scope.pecBoardItems[data].y = evt.y;
    }
});