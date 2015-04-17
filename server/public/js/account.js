var module = angular.module('account', []);

module.controller('login', ['$scope',
    function($scope) {
        $scope.login = function() {
            $scope.output = $scope.name + $scope.password;
        }
    }
]);