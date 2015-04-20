app.controller("foodSuggestionController", function($scope, $stateParams, $location) {
    $scope.foods = [{
        name: "item 1",
        id: 1,
        pecboard: true
    }, {
        name: "item 2",
        id: 2,
        pecboard: false
    }, {
        name: "item 3",
        id: 3,
        pecboard: true
    }, {
        name: "item 4",
        id: 4,
        pecboard: true
    }, {
        name: "item 5",
        id: 5,
        pecboard: true
    }, ];

    $scope.togglePecBoard = function(food) {
        if (food.pecboard)
            food.pecboard = false;
        else
            food.pecboard = true;
    }
});