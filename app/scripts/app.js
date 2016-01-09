'use strict';

var app = angular.module('publicDebate', [
    'ngCookies',
    'ngRoute',
]);

app.config(function($routeProvider) {

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

app.run(function($rootScope, $cookies, $http, $timeout, MessagesService) {

    $rootScope.server = 'http://private-54742-pwa2015publicdebate.apiary-mock.com/pwa2015publicdebate';

    $rootScope.messages = MessagesService.getMessages();

    $timeout(function() {
        $rootScope.clearMessages();
    }, 10000);

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
        $rootScope.user = user;
    }
});
