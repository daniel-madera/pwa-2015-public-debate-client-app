'use strict';

/**
 * @ngdoc function
 * @name publicDebate.controller:threadsController
 * @description
 * # MainCtrl
 * Controller of the publicDebate
 */

var app = angular.module('publicDebate');
app.controller('threadsController', function($scope, Threads) {

    $scope.update = function() {
        var params = {
            // offset: 0,
            // limit: 20,
            // sort: '-created,title'
        };

        var success = function(value, responseHeaders) {
            $scope.threadsObject = value;
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        Threads.get(params, success, error);
    }

    $scope.create = function() {
        var postData = {
            title: $scope.title
        };

        var success = function(value, responseHeaders) {
            $scope.threadsObject.threads.push(value);
            $scope.title = '';
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        Threads.save({}, postData, success, error);
    };

    $scope.update();
});
