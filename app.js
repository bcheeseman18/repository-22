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