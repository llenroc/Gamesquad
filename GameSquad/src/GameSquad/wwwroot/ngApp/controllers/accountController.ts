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
            
            $.connection.hub.stop();
            this.accountService.logout().then(() => {
                this.$location.path('/');
                document.location.reload();
            });
            
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

        //Launch Status Modal
        public statusModal() {
            this.$uibModal.open({
                templateUrl: 'ngApp/views/modals/modalStatus.html',
                controller: StatusController,
                controllerAs: 'modal',
                size: "sm"
            });
        }

        
        
        //Callback for notification counter
        public notificationCount = 0;
        public notificationCheck() {
            //Gets initial count when first connecting
            $.connection.chatHub.client.notificationCount = (newCount) => {
                
               
                this.notificationCount = newCount;
                console.log(this.notificationCount);
                
                this.$scope.$apply();
            }
            //Adds new notification
            $.connection.chatHub.client.newNotification = () => {
                this.notificationCount++;
                this.$scope.$apply();

            }

        }



        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $scope: ng.IScope,
            private $state: ng.ui.IStateService
        ) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });

            //Conntect to signalr
            $.connection.hub.logging = true;
            $.connection.hub.start().done( () => {
                console.log("Connected to signalr");
                
            });
            $.connection.hub.error(function (err) {
                console.log("An error occurded: " + err);
            });

            if (!accountService.isLoggedIn()) {
                this.$location.path('/');
            }
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
                document.location.reload();

                
                this.$uibModalInstance.close();
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private $state: ng.ui.IStateService, private $scope: angular.IScope) {

        }
    }

    export class StatusController {
        public statusMessage;
        public lookingFor;
        public info;
        public ok() {
            
            this.statusService.saveStatus({lookingFor: this.lookingFor, statusMessage: this.statusMessage}).then(() => {
                this.$uibModalInstance.close();
            }).catch((results) => {
                console.log("Save status Failed");
            });
        }

        constructor(private accountService: GameSquad.Services.AccountService, private userDashboardService: GameSquad.Services.UserDashboardService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private $scope: ng.IScope, private statusService: GameSquad.Services.StatusService) {
            userDashboardService.getUserById(accountService.getUserName()).then((data) => {
                this.info = data;
                this.statusMessage = this.info.statusMessage;
                this.lookingFor = this.info.lookingFor;
            });
            
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
