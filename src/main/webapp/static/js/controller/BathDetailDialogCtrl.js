angular.module('myApp')
    .controller('BathDetailDialogCtrl', function ($scope, $mdDialog, $location, BathRepository, bath) {
        $scope.bath = bath;


        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);                                     // !!!!!!!!!
        };

        $scope.comments = [{
                'text': '<p>comment33пукпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмпмр</p>',
                'firstName': 'Vova',
                'lastName': 'Oleshko',
                'iconPath': 'static/img/123.png'
            },
            {'text': 'comment123', 'firstName': 'Vova', 'lastName': 'Oleshko', 'iconPath': 'static/img/123.png'},
            {'text': '<h2>Hello</h2><h3>Hello</h3>', 'firstName': 'Vova', 'lastName': 'Oleshko', 'iconPath': 'static/img/123.png'},
            {'text': '<h1>Hello</h1><h4>Hello</h4>', 'firstName': 'Vova', 'lastName': 'Oleshko', 'iconPath': 'static/img/123.png'},
            {'text': '<div>Hello</div><h3>Hello</h3>', 'firstName': 'Vova', 'lastName': 'Oleshko', 'iconPath': 'static/img/123.png'}];

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