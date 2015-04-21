app.controller("criteriaController", function($scope, $stateParams, $location) {
    $scope.specifications = [];
    $scope.submit = function() {
        $location.url("/foodSuggestion/" + $scope.meal + "/" + $scope.specifically);
    }

    $scope.updateSpecification = function() {
        if ($scope.characteristic == "Texture") {
            $scope.specifications = [{
                value: "Dry",
                id: 1
            }, {
                value: "Liquid",
                id: 2
            }, {
                value: "Chewy",
                id: 3
            }, {
                value: "Crunchy",
                id: 4
            }, {
                value: "Soft",
                id: 5
            }];

        } else if ($scope.characteristic == "Taste") {
            $scope.specifications = [{
                value: "Sweet",
                id: 6
            }, {
                value: "Sour",
                id: 7
            }, {
                value: "Salty",
                id: 8
            }, {
                value: "Bitter",
                id: 9
            }];

        } else if ($scope.characteristic == "Color") {
            $scope.specifications = [{
                value: "Red",
                id: 10
            }, {
                value: "Orange",
                id: 11
            }, {
                value: "Yellow",
                id: 12
            }, {
                value: "Green",
                id: 13
            }, {
                value: "White",
                id: 14
            }, {
                value: "Brown",
                id: 15
            }];

        }
    }
});