angular.module('myApp')
    .controller('ServiceAddDialogCtrl', function ($scope, $mdDialog, $location, ServiceRepository) {
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        var defaultService = {
            title: '',
            code: ''
        };

        $scope.bath = defaultService;

        $scope.save = function () {
            ServiceRepository.add($scope.service).then(function () {
                $mdDialog.hide();
            }, function (response) {
                $scope.service = defaultService;
                $scope.error = response.status;
            });
        };
    });