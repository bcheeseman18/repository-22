(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * chat app
 */

const app = angular.module("ChatApp", []);

// ------- ChatTextController --------------------------------------------------

app.controller("ChatTextController", function ($scope, TextService) {

    $scope.newChats = TextService.getChats();

});

// --------- TextSentController ----------------------------------------------

app.controller('TextSentController', function ($scope, TextService) {


    $scope.send = function () {
        TextService.sendMessage($scope.message);
    };

    $scope.message = '';

});


// ---------- TextService ------------------------------------------------------

app.factory('TextService', function ($http) {

    // ---------- Get -----------------------

    let newChats = [];

    $http.get('https://tiy-28202.herokuapp.com/chats').then(function (response) {
        const chats = response.data.chats;

        for (let i = 0; i < chats.length; i++) {
            newChats.push({
                from: chats[i].from,
                message: chats[i].message,
                time: chats[i].added, 
            });
        };
    });
    return {
        sendMessage(message) {
    // ------------- Post ---------------------
            let data = {
                from: 'Ben',
                message: message,
            };
            $http.post('https://tiy-28202.herokuapp.com/chats', JSON.stringify(data)).then(function (response) {
                console.log(response); 
                let chats = response.data.chats; 

                for (let i = 0; i < chats.length; i++) {
                    // console.log(chats[i]); 
                    newChats.push(chats[i]); 
                }; 
                
            });
        },
        getChats() {
            return newChats;
        },
    };
}); 
},{}]},{},[1]);
