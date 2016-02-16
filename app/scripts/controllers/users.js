var app = angular.module('publicDebate');
app.controller('UsersController', function ($scope, $rootScope, $http, $route, $location, MessagesService) {

    'use strict';
    $scope.login = function () {
        if (!$scope.user || !$scope.user.username || !$scope.user.password) {
            return false;
        }

        return $http.post($scope.server + '/users/login', $scope.user)
            /* jshint unused:vars */
            .success(function (data, status, headers, config) {
                MessagesService.add({
                    text: 'Login was successfull.',
                    level: 'success'
                });
                $rootScope.user = data;
                $http.defaults.headers.post = {
                    'x-access-token': $rootScope.user.token
                };
                $location.path('/threads');
            })
            .error(function (data, status, headers, config) {
                MessagesService.addErrorMessage(data);
            });
    };

    $scope.logout = function () {
        $rootScope.user = undefined;
        $http.defaults.headers.post = {
            'x-access-token': ''
        };
        $location.path('/threads');
    };

    $scope.register = function () {
        var user = $scope.user;
        return $http.post($scope.server + '/users', user)
            /* jshint unused:vars */
            .success(function (data, status, headers, config) {
                MessagesService.add({
                    text: 'User was successfully created.',
                    level: 'success'
                });
                $rootScope.user = undefined;
                $location.path('/threads');
            })
            .error(function (data, status, headers, config) {
                MessagesService.addErrorMessage(data);
            });
    };

});
