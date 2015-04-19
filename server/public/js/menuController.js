app.controller('menu', ['$scope', '$location',
    function($scope, $location) {
        $scope.menuItems = [{
            value: "home",
            link: "/"
        }];
    }
]);