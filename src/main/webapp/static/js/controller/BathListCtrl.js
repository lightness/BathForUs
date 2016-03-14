angular.module('myApp')
    .controller('BathListCtrl', function ($scope, BathRepository, $mdDialog, $location) {

        $scope.selected = [];
        $scope.query = {
            page: 1,
            size: 5,
            sort: 'title',
            dir: 'asc'
        };

        fetchAll();

        $scope.showSaveDialog = function (bath, $event) {
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

        $scope.showDeleteDialog = function (bath, $event) {
            $mdDialog.show(
                $mdDialog.confirm()
                    .targetEvent($event)
                    .clickOutsideToClose(true)
                    .title('Подтверждение удаления')
                    .textContent('Подтвердите удаление информации о бане "'+ bath.title +'"')
                    .ariaLabel('Подтверждение удаления')
                    .ok('Удалить')
                    .cancel('Не удалять')
            ).then(function () {
                BathRepository
                    .remove(bath.id)
                    .then(function () {
                        fetchAll();
                    });
            });
        };

        $scope.showDetailDialog = function(bath, $event) {
            $mdDialog.show({
                controller: 'BathDetailDialogCtrl',
                templateUrl: 'static/view/bath/detailDialog.html',
                targetEvent: $event,
                locals: { bath: bath }
            }).then(function(answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                //$scope.status = 'You cancelled the dialog.';
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

        $scope.goto = function (path) {
            $location.path(path);
        };

        function fetchAll() {
            var requestData = {
                "page.page": $scope.query.page,
                "page.size": $scope.query.size,
                "page.sort": $scope.query.sort,
                "page.sort.dir": $scope.query.dir
            };

            BathRepository
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