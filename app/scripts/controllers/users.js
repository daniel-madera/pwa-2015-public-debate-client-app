'use strict';

var app = angular.module('publicDebate');
app.controller('UsersController', function($scope, $cookies, $location, UserLoginResource, UsersResource) {

    $scope.login = function() {
        if ($scope.username == "" || $scope.password == "") {
            return false;
        }

        var success = function(value, responseHeaders) {
            $cookies.putObject('user', value);
            $location.path('#/threads');
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        UserLoginResource.login({}, $scope.user, success, error);
    }

    $scope.register = function() {

        var success = function(value, responseHeaders) {
            $scope.login();
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        UsersResource.save({}, $scope.user, success, error);
    }

});
