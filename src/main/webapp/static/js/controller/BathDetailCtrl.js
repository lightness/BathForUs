angular.module('myApp')
    .controller('BathDetailCtrl', ['$scope', '$routeParams', 'BathRepository', function ($scope, $routeParams, BathRepository) {
        BathRepository.get($routeParams.bathId).then(function (response) {
            $scope.data = response.data;
            $scope.error = '';
        }, function (response) {
            $scope.data = [];
            $scope.error = "Error: " + response.status;
        });
    }]);