'use strict';

var app = angular.module('publicDebate');
app.controller('UsersController', function($scope, $cookies, $window, $location, UserLoginResource,
    UsersResource, MessagesService) {

    $scope.login = function() {
        if (!$scope.user.username || !$scope.user.password) {
            return false;
        }

        var success = function(value) {
            $cookies.putObject('user', value);
            $scope.user = value;
            $location.path('#/threads');
            $window.location.reload();
        };

        var error = function(httpResponse) {
            MessagesService.addErrorMessages(httpResponse.data.errors);
        };

        return UserLoginResource.login({}, $scope.user, success, error);
    };

    $scope.logout = function() {
        $cookies.remove('user');
        $scope.user = undefined;
        $location.path('#/threads');
        $window.location.reload();
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
