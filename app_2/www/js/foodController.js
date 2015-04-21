app.controller("foodController", function($http, $scope, $stateParams) {

    $http.get(URL + 'rest/food?id=' + $stateParams.foodId, {}).
    success(function(data, status, headers, config) {
        console.log(data);
        $scope.name = data.data.name;
        $scope.image = data.data.image;
        $scope.nutrional = data.data.nutritionImage;
    }).
    error(function(data, status, headers, config) {

    });


});