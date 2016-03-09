angular.module('myApp')
    .controller('BathListCtrl', function ($scope, BathRepository, $mdDialog, $location) {

        $scope.selected = [];
        $scope.query = {
            page: 1,
            size: 5,
            sort: 'title',
            dir: 'asc'
        };

        fetchAll({page: $scope.query.page, 'page.size': $scope.query.size,
            'page.sort': $scope.query.sort, 'page.sort.dir': $scope.query.dir});

        $scope.showDialog = function (bath, $event) {
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

        $scope.onPaginate = function (page, limit) {
            //fetchAll(angular.extend({}, $scope.query, {page: page, size: limit}));
            fetchAll({page: $scope.query.page, 'page.size': $scope.query.size, 
                'page.sort': $scope.query.sort, 'page.sort.dir': $scope.query.dir})
        };

        $scope.onReorder = function (order) {
            //fetchAll(angular.extend({}, $scope.query, {sort: order}));
            fetchAll({page: $scope.query.page, 'page.size': $scope.query.size,
                'page.sort': $scope.query.sort, 'page.sort.dir': $scope.query.dir})
        };

        $scope.goto = function (path) {
            $location.path(path);
        };

        function fetchAll(params) {
            BathRepository.getAll(params).then(function (response) {
                $scope.data = response.data;
                $scope.error = '';
            }, function (response) {
                $scope.bathes = [];
                $scope.error = response.status;
            });
        }
    });