angular.module('myApp')
    .controller('BathDetailDialogCtrl', function ($scope, $mdDialog, $location, BathRestService, MarksService, ServiceRestService, bath, $q, $rootScope, $filter) {
        $scope.bath = bath;

        // # marks feature
        
        $scope.serviceMarks = [];

        BathRestService
            .getAverageMark(bath.id)
            .then(function (response) {
                $scope.bathAverageMark = $filter('number')(response.data, 2);
            });

        if ($rootScope.user.name) {
            BathRestService
                .getMyAverageMark(bath.id)
                .then(function (response) {
                    $scope.myAverageMark = $filter('number')(response.data, 2);
                });
        }

        $q.all([
            ServiceRestService.getAll(),
            BathRestService.getMyMarks(bath.id)
        ]).then(function (data) {
            var services = data[0].data;
            var myMarks = data[1].data;

            angular.forEach(services.content, function (service) {
                var obj = {
                    serviceId: service.id,
                    serviceTitle: service.title
                };

                angular.forEach(myMarks, function (v) {
                    if (v.service.id == service.id) {
                        obj.myValue = v.value;
                        obj.myMarkId = v.id;
                    }
                });

                BathRestService
                    .getAverageMarkByService(bath.id, service.id)
                    .then(function (response) {
                        obj.averageValue = $filter('number')(response.data, 2);
                    });

                $scope.serviceMarks.push(obj);
            });
        });

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);                                     // !!!!!!!!!
        };

        // # comment feature
        
        $scope.comments = [{
            'text': 'comment33пукпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмр',
            'firstName': 'Vova',
            'lastName': 'Oleshko',
            'iconPath': 'static/img/123.png'
        },
            {'text': 'comment123', 'firstName': 'Vova', 'lastName': 'Oleshko', 'iconPath': 'static/img/123.png'},
            {'text': 'comment3', 'firstName': 'Vova', 'lastName': 'Oleshko', 'iconPath': 'static/img/123.png'},
            {'text': 'comment3', 'firstName': 'Vova', 'lastName': 'Oleshko', 'iconPath': 'static/img/123.png'},
            {'text': 'comment3', 'firstName': 'Vova', 'lastName': 'Oleshko', 'iconPath': 'static/img/123.png'}
        ];

        $scope.add = function () {
            $scope.comments.unshift({
                'text': $scope.newComment,
                'firstName': 'Vova',
                'lastName': 'Oleshko',
                'iconPath': 'static/img/123.png'
            });
            $scope.newComment = "";
        };

    });