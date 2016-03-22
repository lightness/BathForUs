angular.module('myApp')
    .controller('BathAddDialogCtrl', function ($scope, $mdDialog, $location, BathRestService, bath, ToastFactory) {
        $scope.closeDialog = function () {
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
            BathRestService
                .save($scope.bath)
                .then(function () {
                    $mdDialog.hide();
                    ToastFactory.showToast('Информация о бане "' + $scope.bath.title + '" сохранена');
                }, function (response) {
                    $scope.bath = defaultBath;
                    ToastFactory.showToast('В процессе сохранения произошла ошибка');
                });
        };
    });