angular.module('myApp')
    .controller('BathAddDialogCtrl', function ($scope, $mdDialog, $location, BathRepository, bath) { 
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        var emptyBath = {
            title: '',
            phone: '',
            address: '',
            info: ''
        };
        
        var defaultBath = angular.merge({}, emptyBath, bath);

        $scope.bath = defaultBath;

        $scope.save = function () {
            BathRepository.save($scope.bath).then(function () {
                $mdDialog.hide();
            }, function (response) {
                $scope.bath = defaultBath;
                $scope.error = response.status;
            });
        };
    });