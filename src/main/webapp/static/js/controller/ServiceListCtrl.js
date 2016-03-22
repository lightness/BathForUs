angular.module('myApp')
    .controller('ServiceListCtrl', function ($scope, $mdDialog, ServiceRestService, ToastFactory) {

        $scope.selected = [];
        $scope.query = {
            page: 1,
            size: 5,
            sort: 'title',
            dir: 'asc'
        };

        fetchAll();

        $scope.showSaveDialog = function (service, $event) {
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

        $scope.showDeleteDialog = function (service, $event) {
            $mdDialog.show(
                $mdDialog.confirm()
                    .targetEvent($event)
                    .clickOutsideToClose(true)
                    .title('Подтверждение удаления')
                    .textContent('Подтвердите удаление услуги "'+ service.title +'"')
                    .ariaLabel('Подтверждение удаления')
                    .ok('Удалить')
                    .cancel('Не удалять')
            ).then(function () {
                ServiceRestService
                    .remove(service.id)
                    .then(function () {
                        fetchAll();
                        ToastFactory.showToast('Информация об услуге "' + $scope.service.title + '" удалена');
                    }, function () {
                        ToastFactory.showToast('В процессе удаления произошла ошибка');
                    });
            });
        };

        $scope.onPaginate = function (page, limit) {
            angular.merge($scope.query, {page: page, size: limit});
            fetchAll();
        };

        $scope.onReorder = function (sort) {
            if (sort.startsWith('-')) {
                angular.merge($scope.query, {sort: sort.slice(1), dir: 'desc'});
            } else {
                angular.merge($scope.query, {sort: sort, dir: 'asc'});
            }
            fetchAll();
        };

        function fetchAll() {
            var requestData = {
                "page.page": $scope.query.page,
                "page.size": $scope.query.size,
                "page.sort": $scope.query.sort,
                "page.sort.dir": $scope.query.dir
            };

            ServiceRestService
                .getAll(requestData)
                .then(function (response) {
                    $scope.data = response.data;
                    $scope.error = '';
                }, function (response) {
                    $scope.data = [];
                    $scope.error = response.status;
                });
        }

    });