angular.module('myApp')
    .controller('ServiceAddDialogCtrl', function ($scope, $mdDialog, $location, ServiceRepository, service) {

        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        var emptyService = {
            title: '',
            code: ''
        };

        var defaultService = angular.merge({}, emptyService, service);

        $scope.service = defaultService;

        $scope.save = function () {
            ServiceRepository.save($scope.service).then(function () {
                $mdDialog.hide();
            }, function (response) {
                $scope.service = defaultService;
                $scope.error = response.status;
            });
        };
    });