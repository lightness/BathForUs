angular.module('myApp')
    .controller('ownRateBoxCtrl', function ($scope){
        $scope.rate = function (newValue) {
            $scope.mark = newValue;
        };
    })
    .directive('ownRateBox', function (BathRestService, ToastFactory) {
        return {
            restrict: 'E',
            templateUrl: 'static/view/rateBox.html',
            scope: {
                mark: '=value',
                bathId: '=bathId',
                serviceId: '=serviceId',
                onRateCallback: '=onRate'
            },
            controller: 'ownRateBoxCtrl',
            link: function(scope, element, attrs){
                scope.mode = 'canRate' in attrs ? 'writable' : 'read-only';
                if (scope.mode != 'read-only') {
                    scope.$watch(function () {
                        return scope.mark;
                    }, function (newValue, oldValue) {
                        if(newValue != oldValue) {
                            BathRestService
                                .putMark(scope.bathId, {serviceId: scope.serviceId, value: newValue})
                                .then(function () {
                                    scope.onRateCallback(scope.serviceId);
                                    ToastFactory.showToast("Ваша оценка очень важна для нас!");
                                })
                                .catch(function () {
                                    ToastFactory.showToast("Что-то пошло не так");
                                });
                        }
                    });
                }
            }
        }
    });