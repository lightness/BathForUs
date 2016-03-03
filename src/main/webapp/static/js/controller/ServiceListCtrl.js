angular.module('myApp')
    .controller('ServiceListCtrl', ['$scope', 'ServiceRepository', function ($scope, ServiceRepository) {
        ServiceRepository.getAll().then(function (response) {
            $scope.services = response.data;
            $scope.error = '';
        }, function (response) {
            $scope.services = [];
            $scope.error = response.status;
        });
    }]);