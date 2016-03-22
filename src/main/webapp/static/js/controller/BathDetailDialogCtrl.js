angular.module('myApp')
    .controller('BathDetailDialogCtrl', function ($scope, $mdDialog, $location, BathRestService, ServiceRestService, bath, $q, $rootScope, $filter) {
        $scope.bath = bath;

        $scope.data = [];


        BathRestService
            .getAverageMark(bath.id)
            .then(function (response) {
                $scope.bathAverageMark = $filter('number')(response.data, 2);
            });

        BathRestService
            .getAverageMarkByUser(bath.id, $rootScope.userId)
            .then(function (response) {
                $scope.myAverageMark = $filter('number')(response.data, 2);
            });

        $q.all([
            ServiceRestService.getAll(),
            BathRestService.getMarksByUser(bath.id, $rootScope.userId)
        ]).then(function (data) {
            var services = data[0];
            var myMarks = data[1];

            angular.forEach(services.data.content, function (value, key) {
                var obj = {
                    serviceId: value.id,
                    serviceTitle: value.title
                };

                angular.forEach(myMarks.data, function (v, k) {
                    if (v.service.id == value.id) {
                        obj.myValue = v.value;
                        obj.myMarkId = v.id;
                    }
                });

                BathRestService
                    .getAverageMarkByService(bath.id, value.id)
                    .then(function (response) {
                        obj.averageValue = $filter('number')(response.data, 2);
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