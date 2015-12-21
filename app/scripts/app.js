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
            templateUrl: 'views/threads.html',
            controller: 'ThreadsController',
        })
        .when('/threads', {
            templateUrl: 'views/threads.html',
            controller: 'ThreadsController',
        })
        .when('/threads/:thread_id/posts', {
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

app.run(function($rootScope, $cookies, $http) {

    var user = $cookies.getObject('user');

    if (user != undefined) {
        $http.defaults.headers.post = {
            'X-Access-Token': user.token
        };

        $rootScope.user = $cookies.getObject('user');
    }
});
