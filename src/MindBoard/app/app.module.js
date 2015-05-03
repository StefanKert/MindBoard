var app = angular.module("MindBoard", ["firebase"]);


angular.module("MindBoard").controller("SampleCtrl", function ($scope, $firebaseArray) {
    var ref = new Firebase("https://glowing-heat-6370.firebaseio.com/");
    $scope.messages = $firebaseArray(ref);
    $scope.addMessage = function () {
        $scope.messages.$add({
            text: $scope.newMessageText
        });
    };
});