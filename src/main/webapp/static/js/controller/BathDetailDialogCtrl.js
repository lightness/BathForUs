angular.module('myApp')
    .controller('BathDetailDialogCtrl', function ($scope, $mdDialog, $location, BathRepository, bath) {
        $scope.bath = bath; debugger;

        
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);                                     // !!!!!!!!!
        };
    });