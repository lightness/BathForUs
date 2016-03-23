angular.module('myApp')
    .factory('MarksService', function ($rootScope, $filter, ServiceRestService, BathRestService, $q) {

        function getFunctionality(bathId) {
            var functionality = [];
            functionality.push(ServiceRestService.getAll());
            functionality.push(BathRestService.getAverageMark(bathId));
            if ($rootScope.user.name) {
                functionality.push(BathRestService.getMyAverageMark(bathId));
                functionality.push(BathRestService.getMyMarks(bathId));
            }
            return functionality;
        }

        function getUpdateFunctionality(bathId, serviceId) {
            var functionality = [];
            functionality.push(BathRestService.getAverageMark(bathId));
            functionality.push(BathRestService.getMyAverageMark(bathId));
            functionality.push(BathRestService.getAverageMarkByService(bathId, serviceId));
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
                    result.averageMark = getFormattedValue(responses[1].data);
                    var myMarks;
                    if ($rootScope.user.name) {
                        result.myAverageMark = getFormattedValue(responses[2].data);
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
                                obj.averageValue = getFormattedValue(response.data);
                            });

                        result.serviceMarks.push(obj);
                    });
                    deferred.resolve(result);
                })
                .catch(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }

        function updateAverageValues(bathId, serviceId, marks) {
            return $q.all(getUpdateFunctionality(bathId, serviceId))
                .then(function (responses) {
                    marks.averageMark = getFormattedValue(responses[0].data);
                    marks.myAverageMark = getFormattedValue(responses[1].data);
                    angular.forEach(marks.serviceMarks, function (serviceMark) {
                        if (serviceMark.serviceId == serviceId) {
                            serviceMark.averageValue = getFormattedValue(responses[2].data);
                        }
                    });
                });
        }

        function getFormattedValue(value) {
            return $filter('number')(value, 2);
        }

        return {
            loadData: loadData,
            updateAverageValues: updateAverageValues
        }
    })
    .controller('BathDetailDialogCtrl', function ($scope, $mdDialog, $location, BathRestService, MarksService, ServiceRestService, bath, ToastFactory) {
        $scope.bath = bath;
        $scope.marks;

        $scope.updateAverageValues = function (serviceId) {
            MarksService
                .updateAverageValues(bath.id, serviceId, $scope.marks)
                .catch(function () {
                    ToastFactory.showToast("Что-то пошло не так");
                });
        };

        // # marks feature

        MarksService
            .loadData(bath.id)
            .then(function (data) {
                $scope.marks = data;
            })
            .catch(function () {
                ToastFactory.showToast("Что-то пошло не так");
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