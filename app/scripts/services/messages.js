'use strict';

var app = angular.module('publicDebate');

app.service('MessagesService', function () {

    var messages = [];

    var defaultMessages = [{
        title: 'Well done!',
        message: 'Operation was successfull.',
        level: 'success'
    }, {
        title: 'Heads up!',
        message: '',
        level: 'info'
    }, {
        title: 'Warning!',
        message: '',
        level: 'warning'
    }, {
        title: 'Oh snap!',
        message: '',
        level: 'danger'
    }];

    /*
     *  Adds message to array of massages.
     *  Message contains attributes message, level.
     */
    this.add = function (message) {

        var finalMessage, i;
        for (i = 0; i < defaultMessages.length; i++) {
            if (defaultMessages[i].level === message.level) {
                finalMessage = defaultMessages[i];
                break;
            }
        }

        if (finalMessage) {
            angular.extend(finalMessage, message);

            for (i = 0; i < messages.length; i++) {
                if (angular.equals(messages[i], finalMessage)) {
                    console.log('Message already exists!');
                    return;
                }
            }

            messages.push(finalMessage);

        } else {
            console.log('Wrong level of message - allowed are success, info, warning, danger.');
        }
    };

    this.remove = function (message) {
        var index = messages.indexOf(message);
        messages.splice(index, 1);
    };

    this.clear = function () {
        messages = [];
    };

    this.getMessages = function () {
        return messages;
    };

    this.addErrorMessage = function (error) {
        if (!error || !error.message) {
            console.log('Invalid error object');
            console.log(error);
            return;
        }
        this.add({
            text: error.message,
            level: 'danger'
        });
    };
});
