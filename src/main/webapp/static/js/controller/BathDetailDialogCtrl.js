angular.module('myApp')
    .controller('BathDetailDialogCtrl', function ($scope, $mdDialog, $location, BathRepository, ServiceRepository, bath, $q, $rootScope) {
        $scope.bath = bath;

        $scope.data = [];

        $q.all([
            BathRepository.getMarks(bath.id),
            ServiceRepository.getAll(),
            BathRepository.getMarksByUser(bath.id, $rootScope.userId)
        ]).then(function (data) {
            var averageMarks = data[0];
            var services = data[1];
            var myMarks = data[2];

            angular.forEach(services.data.content, function (value, key) {
                var obj = {
                    serviceId: value.id,
                    serviceTitle: value.title
                };

                angular.forEach(averageMarks.data, function (v, k) {
                    if (v.service.id == value.id) {
                        obj.averageValue = v.value;
                    }
                });
                
                angular.forEach(myMarks.data, function (v, k) {
                    if (v.service.id == value.id) {
                        obj.myValue = v.value;
                        obj.myMarkId = v.id;
                    }
                });

                $scope.data.push(obj);
            });
        });


        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);                                     // !!!!!!!!!
        };
    });