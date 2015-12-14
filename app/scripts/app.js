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
        .otherwise({
            redirectTo: '/'
        });
});
