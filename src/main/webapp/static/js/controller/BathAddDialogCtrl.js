angular.module('myApp')
    .controller('BathAddDialogCtrl', function ($scope, $mdDialog, $location, BathRepository) { 
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        var defaultBath = {
            title: '',
            phone: '',
            address: '',
            info: ''
        };

        $scope.bath = defaultBath;

        $scope.save = function () {
            BathRepository.add($scope.bath).then(function () {
                $mdDialog.hide();
            }, function (response) {
                $scope.bath = defaultBath;
                $scope.error = response.status;
            });
        };
    });