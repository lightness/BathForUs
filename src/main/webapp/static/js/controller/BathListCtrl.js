angular.module('myApp')
    .controller('BathListCtrl', function ($scope, BathRepository, $mdDialog, $location) {

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

        $scope.goto = function (path) { debugger;
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