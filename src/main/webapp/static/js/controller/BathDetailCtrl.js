// # Obsolete
angular.module('myApp')
    .controller('BathDetailCtrl', ['$scope', '$routeParams', 'BathRepository', function ($scope, $routeParams, BathRepository) {
        BathRepository.get($routeParams.bathId).then(function (response) {
            $scope.bath = response.data;
            $scope.error = '';
        }, function (response) {
            $scope.bath = [];
            $scope.error = response.status;
        });
    }]);