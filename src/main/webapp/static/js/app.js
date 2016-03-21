angular.module('myApp', ['ngRoute', 'ngMaterial', 'md.data.table', 'ngMessages', 'ngCookies'])
    .config(function($routeProvider, $mdIconProvider){
        'use strict';

        $mdIconProvider
            .icon('add', 'static/img/svg/add.svg', 24)
            .icon('close', 'static/img/svg/close.svg', 24)
            .icon('detail', 'static/img/svg/detail.svg', 24)
            .icon('edit', 'static/img/svg/edit.svg', 24)
            .icon('star', 'static/img/svg/star.svg', 24)
            .icon('broom', 'static/img/svg/broom.svg', 48);


        function View(viewPath,controller) {
            this.templateUrl = 'static/view/' + viewPath;
            this.controller = controller;
        }

        $routeProvider
            .when('/bathes', new View('bath/list.html', 'BathListCtrl'))
            .when('/services', new View('service/list.html', 'ServiceListCtrl'))
            .otherwise({ redirectTo: '/bathes' });
    })
    .run(function ($rootScope, $cookieStore) {
        var username = $cookieStore.get("username");
        var userId = $cookieStore.get("userId");
        if (username && userId){
            $rootScope.username = username;
            $rootScope.userId = userId;
        }
    });