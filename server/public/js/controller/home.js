app.controller('homeController', ['$http', '$scope', '$location',
    function($http, $scope, $location) {

        $scope.isLoggedIn = function() {
            $location.path("/p");
        };

        $scope.attemptLogin = function() {
            $http.post('/rest/account', {}).
            success(function(data, status, headers, config) {

            }).
            error(function(data, status, headers, config) {

            });
        }

        $scope.attemptRegister = function() {

        }

    }
]);


app.controller('userHomeController', ['$scope', '$location',
    function($scope, $location) {
        $scope.login = function() {
            // $location.path("/p");
        }

        $scope.register = function() {

        }
    }
]);
/*
loginUsername
loginPassword
registerUsername
registerPassword
registerReEnterPassword
registerreEnterPassword
*/