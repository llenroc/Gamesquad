namespace GameSquad {

    angular.module('GameSquad', ['ui.router', 'ngResource', 'ui.bootstrap', 'angular-filepicker']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider,
        filepickerProvider
    ) => {
        filepickerProvider.setKey('AYcH3ThlIS2qD7OcTjF8Iz');
        // Define routes
        $stateProvider
            .state('landing', {
                url: '/',
                templateUrl: '/ngApp/views/landing.html',
                controller: GameSquad.Controllers.UserDashboardController,
                controllerAs: 'controller'
            })
            .state('home', {
                url: '/dashboard',
                templateUrl: '/ngApp/views/dashboard.html',
                controller: GameSquad.Controllers.UserDashboardController,
                controllerAs: 'controller'
            })
            .state('secret', {
                url: '/secret',
                templateUrl: '/ngApp/views/secret.html',
                controller: GameSquad.Controllers.SecretController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: GameSquad.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: GameSquad.Controllers.RegisterController,
                controllerAs: 'controller'
            })
            .state('externalRegister', {
                url: '/externalRegister',
                templateUrl: '/ngApp/views/externalRegister.html',
                controller: GameSquad.Controllers.ExternalRegisterController,
                controllerAs: 'controller'
            }) 
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: GameSquad.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('findUsers', {
                url: '/findUsers',
                templateUrl: '/ngApp/views/userSearch.html',
                controller: GameSquad.Controllers.UserController,
                controllerAs: 'controller'
            })
            .state('team', {
                url: '/team',
                templateUrl: '/ngApp/views/team.html',
                controller: GameSquad.Controllers.TeamController,
                controllerAs: 'controller'
            })
            .state('teamCreate', {
                url: '/teamCreate',
                templateUrl: '/ngApp/views/teamCreate.html',
                controller: GameSquad.Controllers.TeamController,
                controllerAs: 'controller'
            })
            .state('myTeam', {
                url: '/myTeam',
                templateUrl: '/ngApp/views/myTeam.html',
                controller: GameSquad.Controllers.TeamController,
                controllerAs: 'controller'
            })
            .state('postCreate', {
                url: '/postCreate',
                templateUrl: '/ngApp/views/postCreate.html',
                controller: GameSquad.Controllers.PostCreateController,
                controllerAs: 'controller'
            })
            .state('updates', {
                url: '/updates',
                templateUrl: '/ngApp/views/updates.html',
                controller: GameSquad.Controllers.PostController,
                controllerAs: 'controller'
            })
            .state('teamInfo', {
                url: '/team/:id',
                templateUrl: '/ngApp/views/teamInfo.html',
                controller: GameSquad.Controllers.TeamInfoController,
                controllerAs: 'controller'
            })
            .state('friends', {
                url: '/friends',
                templateUrl: '/ngApp/views/friends.html',
                controller: GameSquad.Controllers.FriendController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);

        //SignalR Stuff
        //$(function () {
        //   // $.connection.hub.stop();
        //    $.connection.hub.logging = true;
        //    $.connection.hub.start();
            

        //});
        //$.connection.hub.error(function (err) {
        //    console.log("An error occurded: " + err);
        //});
    });

    
    angular.module('GameSquad').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        })
    );

    angular.module('GameSquad').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

    angular.module('GameSquad').directive('schrollBottom', function () {
        return {
            scope: {
                schrollBottom: "="
            },
            link: function (scope, element) {
                scope.$watchCollection('schrollBottom', function (newValue) {
                    if (newValue) {
                        $(element).scrollTop($(element)[0].scrollHeight);
                    }
                });
            }
        }
    })

}
