'use strict';

var app = angular.module('publicDebate');
app.controller('UsersController', function($scope, $http, $route, $cookies, $window, $location, MessagesService) {

    $scope.saveuser = function(user) {
        $cookies.putObject('user', user);
        $scope.user = user;
        $location.path('/threads');
        $window.location.reload();
    };

    $scope.login = function() {
        if (!$scope.user || !$scope.user.username || !$scope.user.password) {
            return false;
        }

        return $http.post($scope.server + '/users/login', $scope.user)
            /* jshint unused:vars */
            .success(function(data, status, headers, config) {
                MessagesService.add({
                    text: 'Login was successfull.',
                    level: 'success'
                });
                $scope.saveuser(data);
            })
            .error(function(data, status, headers, config) {
                MessagesService.addErrorMessages(data.errors);
            });
    };

    $scope.logout = function() {
        $cookies.remove('user');
        $scope.user = undefined;
        $location.path('/threads');
        $window.location.reload();
    };

    $scope.register = function() {
        return $http.post($scope.server + '/users', $scope.user)
            /* jshint unused:vars */
            .success(function(data, status, headers, config) {
                MessagesService.add({
                    text: 'User was successfully created.',
                    level: 'success'
                });
                $scope.saveuser(data);
            })
            .error(function(data, status, headers, config) {
                MessagesService.addErrorMessages(data.errors);
            });
    };

});
