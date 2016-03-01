angular.module('myApp')
    .controller('bathController', ['$scope', 'BathRepository', function($scope, BathRepository) {
    BathRepository.getAll().then(function (response) {
        $scope.data = response.data;
    }, function (response) {
        $scope.data = "Error: " + response.status;
    });
}]);