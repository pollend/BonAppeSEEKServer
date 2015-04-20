app.controller("criteriaController", function($scope, $stateParams, $location) {
    $scope.specifications = [];
    $scope.submit = function() {
        $location.url("/foodSuggestion/" + $scope.meal + "/" + $scope.specifically);
    }

    $scope.updateSpecification = function() {
        if ($scope.characteristic == "Texture") {
            $scope.specifications = [{
                value: "Dry",
                id: 0
            }, {
                value: "Liquid",
                id: 1
            }, {
                value: "Chewy",
                id: 2
            }, {
                value: "Crunchy",
                id: 3
            }, {
                value: "Soft",
                id: 4
            }];

        } else if ($scope.characteristic == "Taste") {
            $scope.specifications = [{
                value: "Sweet",
                id: 5
            }, {
                value: "Sour",
                id: 6
            }, {
                value: "Salty",
                id: 7
            }, {
                value: "Bitter",
                id: 8
            }];

        } else if ($scope.characteristic == "Color") {
            $scope.specifications = [{
                value: "Red",
                id: 9
            }, {
                value: "Orange",
                id: 10
            }, {
                value: "Yellow",
                id: 11
            }, {
                value: "Green",
                id: 12
            }, {
                value: "White",
                id: 13
            }];

        }
    }
});