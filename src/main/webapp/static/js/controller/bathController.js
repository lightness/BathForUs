angular.module('myApp')
    .controller('myCtrl', ['$scope', 'BathRepository', function($scope, BathRepository) {
    BathRepository.getAll().then(function (response) {
        $scope.data = response.data;
    }, function (response) {
        $scope.data = "Error: " + response.status;
    });
    $scope.count = 0;
    $scope.myFunction = function() {
        $scope.count++;
    }
}]);