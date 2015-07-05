var app = angular.module("MindBoard", ["firebase", "LocalStorageModule"]);


app.controller("SampleCtrl", function ($scope, $firebaseArray) {
    var ref = new Firebase("https://glowing-heat-6370.firebaseio.com/");
    $scope.messages = $firebaseArray(ref);
    $scope.addMessage = function () {
        console.log("test");
        $scope.messages.$add({
            text: $scope.newMessageText
        });
        console.log("test");
    };
});

app.filter("reverse", function () {
    return function (items) {
        return items.slice().reverse(); // Create a copy of the array and reverse the order of the items
    };
});

app.controller("LoginCtrl", function($scope, $firebaseArray, localStorageService) {
    var ref = new Firebase("https://mindboardusers.firebaseio.com/");
    $scope.messages = $firebaseArray(ref);
    $scope.login = function () {
        console.log("test");
        $scope.messages.$add({
            text: $scope.newMessageText
        });
        console.log("test");
    };
});