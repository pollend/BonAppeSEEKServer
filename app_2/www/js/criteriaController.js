app.controller("criteriaController", function($scope, $stateParams, $location) {
    $scope.specifications = [];
    $scope.submit = function() {
        $location.url("/food/" + $scope.meal + "/" + $scope.specifically);
    }

    $scope.updateSpecification = function() {
        if ($scope.characteristic == "Texture") {
            $scope.specifications = ["Dry", "Liquid", "Chewy", "Crunchy", "Soft"];

        } else if ($scope.characteristic == "Taste") {
            $scope.specifications = ["Sweet", "Sour", "Salty", "Bitter"];

        } else if ($scope.characteristic == "Color") {
            $scope.specifications = ["Red", "Orange", "Yellow", "Green", "White"];

        }
    }
});