angular.module('myApp')
    .controller('ServiceAddDialogCtrl', function ($scope, $mdDialog, $location, ServiceRestService, service, ToastFactory) {

        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        var emptyService = {
            title: '',
            code: ''
        };

        var defaultService = angular.merge({}, emptyService, service);

        $scope.service = defaultService;

        $scope.save = function () {
            ServiceRestService.save($scope.service).then(function () {
                $mdDialog.hide();
                ToastFactory.showToast('Информация об услуге "' + $scope.service.title + '" сохранена');
            }, function (response) {
                $scope.service = defaultService;
                ToastFactory.showToast('В процессе сохранения произошла ошибка');
            });
        };
    });