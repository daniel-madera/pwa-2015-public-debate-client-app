'use strict';

var app = angular.module('publicDebate');
app.controller('UsersController', function($scope, $cookies, $location, UserLoginResource,
    UsersResource, MessagesService) {

    $scope.login = function() {
        if (!$scope.username || !$scope.password) {
            return false;
        }

        var success = function(value) {
            $cookies.putObject('user', value);
            $location.path('#/threads');
        };

        var error = function(httpResponse) {
            MessagesService.addErrorMessages(httpResponse.data.errors);
        };

        return UserLoginResource.login({}, $scope.user, success, error);
    };

    $scope.register = function() {

        var success = function() {
            $scope.login();
        };

        var error = function(httpResponse) {
            MessagesService.addErrorMessages(httpResponse.data.errors);
        };

        return UsersResource.save({}, $scope.user, success, error);
    };

});
