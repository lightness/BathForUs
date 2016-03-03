angular.module('myApp')
    .controller('BathListCtrl', ['$scope', 'BathRepository', function ($scope, BathRepository) {
        BathRepository.getAll().then(function (response) {
            $scope.data = response.data;
            $scope.error = '';
        }, function (response) {
            $scope.data = [];
            $scope.error = response.status;
        });
    }]);