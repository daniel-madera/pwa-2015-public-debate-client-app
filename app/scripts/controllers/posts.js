'use strict';

var app = angular.module('publicDebate');

app.controller('PostsController', function ($scope, $routeParams, $location, $http, PaginationService, MessagesService) {
    $scope.thread = {};
    $scope.thread.id = $routeParams.threadId;

    $scope.get = function () {
        var result = $http.get($scope.server + '/threads/' + $scope.thread.id + '/posts')
            /* jshint unused:vars */
            .success(function (data, status, headers, config) {
                $scope.postsObject = data;
                angular.extend($scope.postsObject, {
                    pagination: PaginationService.getPagination(headers)
                });
            })
            .error(function (data, status, headers, config) {
                MessagesService.addErrorMessages(data.errors);
            });

        result = result && $http.get($scope.server + '/threads/' + $scope.thread.id)
            /* jshint unused:vars */
            .success(function (data, status, headers, config) {
                $scope.thread = data;
            })
            .error(function (data, status, headers, config) {
                MessagesService.addErrorMessages(data.errors);
            });

        return result;
    };

    $scope.create = function () {
        if (!$scope.user) {
            MessagesService.add({
                text: 'Please sign in or register.',
                level: 'danger'
            });
            return false;
        }

        if (!$scope.text) {
            return false;
        }

        var postData = {
            text: $scope.text
        };

        return $http.post($scope.server + '/threads/' + $scope.thread.id + '/posts', postData)
            /* jshint unused:vars */
            .success(function (data, status, headers, config) {
                $scope.text = '';
                MessagesService.add({
                    text: 'Post was successfully created.',
                    level: 'success'
                });
                // $location.path('/threads/' + $scope.thread.id + '/posts');
                $scope.get();
            })
            .error(function (data, status, headers, config) {
                MessagesService.addErrorMessages(data.errors);
            });
    };

    angular.element(document).ready(function () {
        $scope.get();
    });
});
