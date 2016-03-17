angular.module('myApp')
    .factory('ToastFactory', function ($mdToast) {
        return {
            showToast: function (text) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(text)
                        .position('bottom right')
                        .hideDelay(3000)
                );
            }
        }
    });