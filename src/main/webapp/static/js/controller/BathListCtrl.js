angular.module('myApp')
    .controller('BathListCtrl', function ($scope, BathRestService, $mdDialog, $location, $mdToast, ToastFactory) {

        $scope.selected = [];
        $scope.query = {
            page: 1,
            size: 5,
            sort: 'title'
        };

        fetchAll();

        $scope.showSaveDialog = function (bath, $event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'static/view/bath/addDialog.html',
                controller: 'BathAddDialogCtrl',
                locals: {bath: bath},
                onRemoving: function () { /// # kostyl
                    fetchAll();
                }
            });
        };

        $scope.showDeleteDialog = function (bath, $event) {
            $mdDialog.show(
                $mdDialog.confirm()
                    .targetEvent($event)
                    .clickOutsideToClose(true)
                    .title('Подтверждение удаления')
                    .textContent('Подтвердите удаление информации о бане "' + bath.title + '"')
                    .ariaLabel('Подтверждение удаления')
                    .ok('Удалить')
                    .cancel('Не удалять')
            ).then(function () {
                BathRestService
                    .remove(bath.id)
                    .then(function () {
                        fetchAll();
                        ToastFactory.showToast('Информация о бане "' + bath.title + '" удалена');
                    }, function () {
                        ToastFactory.showToast('В процессе удаления произошла ошибка');
                    });
            });
        };

        $scope.showDetailDialog = function (bath, $event) {
            $mdDialog.show({
                controller: 'BathDetailDialogCtrl',
                templateUrl: 'static/view/bath/detailDialog.html',
                targetEvent: $event,
                locals: {bath: bath}
            });
        };

        $scope.onPaginate = function (page, limit) {
            angular.extend($scope.query, {page: page, size: limit});
            fetchAll();
        };

        $scope.onReorder = function (sort) {
            angular.extend($scope.query, {sort: sort});
            fetchAll();
        };

        $scope.goto = function (path) {
            $location.path(path);
        };

        function fetchAll() {
            var requestData = {
                "page.page": $scope.query.page,
                "page.size": $scope.query.size,
                "page.sort": $scope.query.sort.startsWith('-') ? $scope.query.sort.slice(1) : $scope.query.sort,
                "page.sort.dir": $scope.query.sort.startsWith('-') ? 'desc' : 'asc'
            };

            BathRestService
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