angular.module('myApp')
    .controller('BathListCtrl', ['$scope', 'BathRepository', '$mdDialog', function ($scope, BathRepository, $mdDialog) {

        fetchAll();

        $scope.showDialog = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'static/view/bath/addDialog.html',
                controller: 'BathAddDialogCtrl',
                locals: {bath: ''},
                onRemoving: function () {
                    fetchAll();
                }
            });
        };

        function fetchAll() {
            BathRepository.getAll().then(function (response) {
                $scope.bathes = response.data;
                $scope.error = '';
            }, function (response) {
                $scope.bathes = [];
                $scope.error = response.status;
            });
        }
    }]);