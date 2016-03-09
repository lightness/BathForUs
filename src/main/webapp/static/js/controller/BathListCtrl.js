angular.module('myApp')
    .controller('BathListCtrl', function ($scope, BathRepository, $mdDialog, $location) {

        fetchAll();

        $scope.showDialog = function (bath, $event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'static/view/bath/addDialog.html',
                controller: 'BathAddDialogCtrl',
                locals: { bath: bath },
                onRemoving: function () {
                    fetchAll();
                }
            });
        };

        $scope.goto = function (path) {
            $location.path(path);
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
    });