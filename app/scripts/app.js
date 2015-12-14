'use strict';

/**
 * @ngdoc overview
 * @name publicDebate
 * @description
 * # publicDebate
 *
 * Main module of the application.
 */
var app = angular.module('publicDebate', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute'
]);

var server = "http://private-54742-pwa2015publicdebate.apiary-mock.com/pwa2015publicdebate";

app.factory('Threads', ['$resource', function($resource) {
    return $resource(server + '/threads', {});
}]);

app.factory('Posts', ['$resource', function($resource) {
    return $resource(server + '/threads/:thread_id/posts', {});
}]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/threads-list.html',
            controller: 'threadsController',
            controllerAs: 'threads'
        })
        .when('/threads', {
            templateUrl: 'views/threads-list.html',
            controller: 'threadsController',
            controllerAs: 'threads'
        })
        .when('/threads/:thread_id/posts', {
            templateUrl: 'views/posts.html',
            controller: 'postsController',
            controllerAs: 'posts'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController',
            controllerAs: 'about'
        })
        .otherwise({
            redirectTo: '/'
        });
});
