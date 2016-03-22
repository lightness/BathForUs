angular.module('myApp')
    .factory('MarksService', function ($rootScope, $filter, ServiceRestService, BathRestService, $q) {

        function getFunctionality(bathId) {
            var functionality = [ServiceRestService.getAll(), BathRestService.getAverageMark(bathId)];
            if ($rootScope.user.name) {
                functionality.push(BathRestService.getMyAverageMark(bathId));
                functionality.push(BathRestService.getMyMarks(bathId));
            }
            return functionality;
        }

        function loadData(bathId) {
            var deferred = $q.defer();
            var result = {
                averageMark: undefined,
                myAverageMark: undefined,
                serviceMarks: []
            };
            $q.all(getFunctionality(bathId))
                .then(function (responses) {
                    var services = responses[0].data.content; // temp
                    result.averageMark = $filter('number')(responses[1].data, 2);
                    var myMarks;
                    if ($rootScope.user.name) {
                        result.myAverageMark = $filter('number')(responses[2].data, 2);
                        myMarks = responses[3].data;
                    }

                    angular.forEach(services, function (service) {
                        var obj = {
                            serviceId: service.id,
                            serviceTitle: service.title
                        };

                        if ($rootScope.user.name) {
                            angular.forEach(myMarks, function (myMark) {
                                if (myMark.service.id == service.id) {
                                    obj.myValue = myMark.value;
                                    obj.myMarkId = myMark.id;
                                }
                            });
                        }

                        BathRestService
                            .getAverageMarkByService(bathId, service.id)
                            .then(function (response) {
                                obj.averageValue = $filter('number')(response.data, 2);
                            });

                        result.serviceMarks.push(obj);
                    });
                    deferred.resolve(result);
                }, function () {
                    deferred.reject();
                });
            return deferred.promise;
        }

        return {
            loadData: loadData
        }
    })
    .controller('BathDetailDialogCtrl', function ($scope, $mdDialog, $location, BathRestService, MarksService, ServiceRestService, bath, $q, $rootScope, $filter) {
        $scope.bath = bath;

        // # marks feature

        MarksService
            .loadData(bath.id)
            .then(function (data) {
                angular.extend($scope, data);
            })
            .catch(function () {
               alert('ahtung');
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