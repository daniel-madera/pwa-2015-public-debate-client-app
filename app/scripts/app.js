'use strict';

var app = angular.module('publicDebate', [
    'ngCookies',
    'ngRoute'
]);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            redirectTo: '/threads'
        })
        .when('/threads/:threadId', {
            templateUrl: 'views/threads.html',
            controller: 'ThreadsController',
        })
        .when('/threads', {
            templateUrl: 'views/threads.html',
            controller: 'ThreadsController',
        })
        .when('/threads/:threadId/posts', {
            templateUrl: 'views/posts.html',
            controller: 'PostsController',
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UsersController',
        })
        .when('/users/login', {
            templateUrl: 'views/login.html',
            controller: 'UsersController',
        })
        .when('/users/logout', {
            templateUrl: 'views/logout.html',
            controller: 'UsersController',
        })
        .otherwise({
            redirectTo: '/'
        });

});

app.run(function ($rootScope, $cookies, $http, $timeout, MessagesService) {

    // $rootScope.server = 'http://private-54742-pwa2015publicdebate.apiary-mock.com/pwa2015publicdebate';
    // $rootScope.server = 'http://127.0.0.1:3000';
    $rootScope.server = 'https://calm-bastion-85891.herokuapp.com';

    $rootScope.messages = MessagesService.getMessages();

    $timeout(function () {
        $rootScope.clearMessages();
    }, 10000);

    $rootScope.closeMessage = function (index) {
        MessagesService.remove($rootScope.messages[index]);
    };

    $rootScope.clearMessages = function () {
        MessagesService.clear();
        $rootScope.messages = MessagesService.getMessages();
    };

    // test purpose
    // $rootScope.user = {
    //     username: 'daniel.madera',
    //     token: 'daniel.madera',
    //     firstName: 'Daniel',
    //     lastName: 'Maděra'
    // };

    if ($rootScope.user !== undefined) {
        $http.defaults.headers.post = {
            'x-access-token': $rootScope.user.token
        };
    }
});

app.directive('menu', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'views/menu.html',
        controller: function ($scope) {}
    }
})
