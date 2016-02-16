'use strict';

var app = angular.module('publicDebate');
app.controller('ThreadsController', function ($scope, $rootScope, $routeParams, $http, $filter, $location, PaginationService, MessagesService) {

    $scope.get = function () {
        return $http.get($scope.server + '/threads')
            /* jshint unused:vars */
            .success(function (data, status, headers, config) {
                $scope.threadsObject = data;
                // appends pagination object to data (threadsObject)
                angular.extend($scope.threadsObject, {
                    pagination: PaginationService.getPagination(headers)
                });

                $scope.select();
            })
            .error(function (data, status, headers, config) {
                MessagesService.addErrorMessage(data);
            });
    };

    $scope.create = function () {

        if ($rootScope.user === undefined) {
            MessagesService.add({
                text: 'Please sign in or register.',
                level: 'danger'
            });

            return false;
        }

        if (!$scope.thread.title) {
            MessagesService.add({
                text: 'Thread title cannot be empty.',
                level: 'danger'
            });
            return false;
        }

        var postData = {
            title: $scope.thread.title
        };

        return $http.post($scope.server + '/threads', postData)
            /* jshint unused:vars */
            .success(function (data, status, headers, config) {
                $scope.thread = undefined;
                MessagesService.add({
                    text: 'Thread was successfully created.',
                    level: 'success'
                });
                $scope.get();
            })
            .error(function (data, status, headers, config) {
                MessagesService.addErrorMessage(data);
            });
    };

    $scope.edit = function () {

        if ($scope.user === undefined) {
            MessagesService.add({
                text: 'Please sign in or register.',
                level: 'danger'
            });

            return false;
        }

        if (!$scope.thread.title) {
            MessagesService.add({
                text: 'Thread title cannot be empty.',
                level: 'danger'
            });
            return false;
        }

        if ($scope.thread.author.username !== $scope.user.username) {
            MessagesService.add({
                text: 'You can edit only yours threads.',
                level: 'danger'
            });
            return false;
        }

        var postData = {
            title: $scope.thread.title
        };

        return $http.patch($scope.server + '/threads/' + $scope.thread.id, postData)
            /* jshint unused:vars */
            .success(function (data, status, headers, config) {
                MessagesService.add({
                    text: 'Thread was successfully modified.',
                    level: 'success'
                });
                $scope.thread = undefined;
            })
            .error(function (data, status, headers, config) {
                MessagesService.addErrorMessage(data);
            });
    };

    $scope.select = function () {
        // if is specified threadId (threads/1) then set 
        // selected thread to $scope.thread variable
        if ($routeParams.threadId && $scope.threadsObject) {
            var threads = $filter('filter')($scope.threadsObject.threads, {
                id: $routeParams.threadId
            });
            if (threads.length === 1) {
                $scope.thread = threads[0];
            }
        }
    };

    angular.element(document).ready(function () {
        $scope.get();
    });
});
