var app = angular.module("MindBoard", ["firebase", "LocalStorageModule", "ui.router"]);
app.config(AppConfig);

function AppConfig($urlRouterProvider, $stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/login.html'
    }).state('messages', {
        url: '/messages',
        controller: 'MessageCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/messageList.html'
    });
    $urlRouterProvider.otherwise('login');
}

app.controller("AppCtrl", function ($rootScope, $scope, localStorageService, $state) {
    $scope.logout = function () {
        $rootScope.loggedIn = false;
        $rootScope.user = null;
        localStorageService.clearAll();
        $state.go("login");
    };

    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        if (localStorageService.get("user") !== null) {
            $rootScope.loggedIn = true;
            $rootScope.user = localStorageService.get("user");
        } else {
            if(toState.name !== "login")
                $scope.logout();
        }
    });
});

app.controller("MessageCtrl", function ($rootScope, $scope, $firebaseArray) {
    var ref = new Firebase("https://glowing-heat-6370.firebaseio.com/");
    $scope.messages = $firebaseArray(ref);
    $scope.addMessage = function () {
        $scope.messages.$add({
            text: $scope.newMessageText,
            fullname: $rootScope.user.firstname + " " + $rootScope.user.lastname,
            class: $rootScope.user.class
        });
    };
    var userRef = new Firebase("https://mindboardusers.firebaseio.com/");
    $scope.users = $firebaseArray(userRef);
    $scope.addUser = function () {
        $scope.users.$add({
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            class: $scope.class,
        });
    };
});

app.filter("reverse", function () {
    return function (items) {
        return items.slice().reverse(); // Create a copy of the array and reverse the order of the items
    };
});

app.controller("LoginCtrl", function ($rootScope, $scope, $firebaseArray, localStorageService, $state) {
    var ref = new Firebase("https://mindboardusers.firebaseio.com/");
    $scope.users = $firebaseArray(ref);
    $scope.login = function () {
        var queryResult = Enumerable.From($scope.users).Where(function (x) { return x.firstname === $scope.username; }).ToArray();
        if (queryResult.length > 0) {
            localStorageService.set("lastLogIn", new Date().getTime());
            localStorageService.set("user", queryResult[0]);
            $rootScope.loggedIn = true;
            $rootScope.user = queryResult[0];
            $state.go("messages");
        } else {
            alert("Ungültiger Benutzername");
            localStorageService.clearAll();
        }

    };
});

app.controller("UsersCtrl", function ($scope, $firebaseArray, localStorageService) {
    var ref = new Firebase("https://mindboardusers.firebaseio.com/");
    $scope.users = $firebaseArray(ref);
    $scope.addUser = function () {
        $scope.users.$add({
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            class: $scope.class,
        });
    };
});