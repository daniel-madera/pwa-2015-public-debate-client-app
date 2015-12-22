'use strict';

var app = angular.module('publicDebate', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute'
]);

app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            redirectTo: '/threads'
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
        .otherwise({
            redirectTo: '/'
        });
});

app.run(function($rootScope, $cookies, $http, MessagesService) {

    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.clearMessages();
    });

    $rootScope.messages = MessagesService.getMessages();

    $rootScope.closeMessage = function(index) {
        MessagesService.remove($rootScope.messages[index]);
    };

    $rootScope.clearMessages = function() {
        MessagesService.clear();
        $rootScope.messages = MessagesService.getMessages();
    };

    var user = $cookies.getObject('user');

    if (user !== undefined) {
        $http.defaults.headers.post = {
            'X-Access-Token': user.token
        };

        $rootScope.user = $cookies.getObject('user');
    }
});
