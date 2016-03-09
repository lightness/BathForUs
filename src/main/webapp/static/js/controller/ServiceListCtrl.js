angular.module('myApp')
    .controller('ServiceListCtrl', function ($scope, $mdDialog, ServiceRepository) {

        fetchAll();

        $scope.showDialog = function (service, $event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'static/view/service/addDialog.html',
                controller: 'ServiceAddDialogCtrl',
                locals: { service: service },
                onRemoving: function () {
                    fetchAll();
                }
            });
        };

        function fetchAll() {
            ServiceRepository.getAll().then(function (response) {
                $scope.services = response.data;
                $scope.error = '';
            }, function (response) {
                $scope.services = [];
                $scope.error = response.status;
            });
        }

    });