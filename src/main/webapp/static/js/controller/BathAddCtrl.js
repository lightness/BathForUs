angular.module('myApp')
    .controller('BathAddCtrl', ['$scope', '$location', 'BathRepository', function ($scope, $location, BathRepository) {
        var defaultBath = {
            title: '',
            phone: '',
            address: '',
            info: ''
        };

        $scope.bath = defaultBath;

        $scope.goto = function (path) {
            $location.path(path);
        };

        $scope.save = function () {
            BathRepository.add($scope.bath).then(function (response) {
                $location.path("/bathes/"+ response.data.id);
            }, function (response) {
                $scope.bath = defaultBath;
                $scope.error = response.status;
            });
        };


    }]);