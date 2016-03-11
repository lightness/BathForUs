angular.module('myApp')
    .controller('ServiceListCtrl', function ($scope, $mdDialog, ServiceRepository) {

        $scope.selected = [];
        $scope.query = {
            page: 1,
            size: 5,
            sort: 'title',
            dir: 'asc'
        };

        fetchAll();

        $scope.showDialog = function (service, $event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'static/view/service/addDialog.html',
                controller: 'ServiceAddDialogCtrl',
                locals: {service: service},
                onRemoving: function () {
                    fetchAll();
                }
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

            ServiceRepository
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