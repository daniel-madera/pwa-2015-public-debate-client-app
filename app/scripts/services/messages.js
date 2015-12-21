'use strict';

var app = angular.module('publicDebate');

app.service('MessagesService', function() {

    var messages = [];

    var defaultMessages = [{
        title: "Well done!",
        text: "Operation was successfull.",
        level: 'success'
    }, {
        title: "Heads up!",
        text: "",
        level: 'info'
    }, {
        title: "Warning!",
        text: "",
        level: 'warning'
    }, {
        title: "Oh snap!",
        text: "",
        level: 'danger'
    }];

    /*
     *  Adds message to array of massages.
     *  Message contains attributes text, level.
     */
    this.add = function(message) {

        var finalMessage = undefined;
        for (var i = 0; i < defaultMessages.length; i++) {
            if (defaultMessages[i].level == message.level) {
                finalMessage = defaultMessages[i];
                break;
            }
        };

        if (finalMessage) {
            angular.extend(finalMessage, message);

            for (var i = 0; i < messages.length; i++) {
                if (angular.equals(messages[i], finalMessage)) {
                    console.log("Message already exists!");
                    return;
                };
            }

            messages.push(finalMessage);

        } else {
            console.log("Wrong level of message - allowed are success, info, warning, danger.");
        }
    }

    this.remove = function(message) {
        var index = messages.indexOf(message);
        messages.splice(index, 1);
    }

    this.clear = function() {
        messages = [];
    }

    this.getMessages = function() {
        return messages;
    }

    this.addErrorMessages = function(errors) {
        if (errors === undefined || errors.length == 0) {
            return;
        }
        angular.forEach(errors, function(value, key) {
            this.add({
                text: value.user_message,
                level: 'danger'
            });
        }, this);
    }
});
