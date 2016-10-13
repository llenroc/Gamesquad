namespace GameSquad.Controllers {
    declare var $;
    export class AccountController {
        public externalLogins;

        public getUserName() {
            return this.accountService.getUserName();
        }

        public getClaim(type) {
            return this.accountService.getClaim(type);
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public logout() {
            this.accountService.logout();
            $.connection.hub.stop();
            this.$location.path('/');
        }

        public getExternalLogins() {
            return this.accountService.getExternalLogins();
        }

        //Launch Login Modal
        public loginModal() {
            this.$uibModal.open({
                templateUrl: 'ngApp/views/modals/modalLogin.html',
                controller: LoginController,
                controllerAs: 'modal',
            });
        }

        
        
        //Callback for notification counter
        public notificationCount;
        public notificationCheck() {
            
            $.connection.notificationHub.client.notificationCount = (newCount) => {
                
                this.notificationCount = newCount;
                console.log(this.notificationCount);
                
                this.$scope.$apply();
            }
        }

       

       //Calls the server for notifications
        public notificationChecker() {

            if ($.connection.chatHub.state !== $.signalR.connectionState.connected) {
                $.connection.notificationHub.server.notificationCheck();
            }
            

        }

        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $scope: ng.IScope
        ) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });

            //Conntect to signalr
            $.connection.hub.logging = true;
            $.connection.hub.start().done( () => {
                console.log("Connected to signalr");
                //Runs notification checker and then sets it to run every x seconds
                this.notificationChecker()
                setInterval(() => { this.notificationChecker() }, 5000);
            });
            $.connection.hub.error(function (err) {
                console.log("An error occurded: " + err);
            });

            this.notificationCheck();

        }
    }

    angular.module('GameSquad').controller('AccountController', AccountController);

    export class LoginController {
        public loginUser;
        public validationMessages;
        public emailOrUser;

        public login() {
            if (this.emailOrUser.includes("@")) {
                this.loginUser.email = this.emailOrUser;
            }
            else {
                this.loginUser.userName = this.emailOrUser;
            }
            this.accountService.login(this.loginUser).then(() => {
                this.$location.path('/');
                this.$uibModalInstance.close();
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private $state: ng.ui.IStateService) {

        }
    }


    export class RegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.register(this.registerUser).then(() => {
                this.$location.path('/profileEdit');
                document.location.reload();
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        constructor(private accountService: GameSquad.Services.AccountService,
            private $location: ng.ILocationService,
            private $state: ng.ui.IStateService) { }
    }





    export class ExternalRegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.registerExternal(this.registerUser.username)
                .then((result) => {
                    this.$location.path('/profileEdit');
                    document.location.reload();
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }

        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService) { }

    }

    export class ConfirmEmailController {
        public validationMessages;

        constructor(private accountService: GameSquad.Services.AccountService, private $http: ng.IHttpService, private $stateParams: ng.ui.IStateParamsService, private $location: ng.ILocationService) {
            let userId = $stateParams['userId'];
            let code = $stateParams['code'];
            accountService.confirmEmail(userId, code)
                .then((result) => {
                    this.$location.path('/');
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }
    }
}
