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
            })

        }

        public notificationCounter = { totalCount: "" }
        public notificationCheck() {
            let tempNotificationCount = this.notificationCounter;
            let scope = this.$scope;
            
            $.connection.notificationHub.client.notificationCount = function notificationCount(newCount) {
                tempNotificationCount.totalCount = newCount;
                
                console.log(newCount);
                scope.$apply();
            }
            
            


        }

        //public notificationCount = (newCount) => {
        //    this.notificationCounter = newCount;

        //        console.log(newCount + "hi");

        //        this.$scope.$apply();
        //}


        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $scope: ng.IScope
        ) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });

            //this.notificationCount();

            setInterval(function () {
                console.log("notificationcheck!");
                if (accountService.isLoggedIn()) {
                    $.connection.notificationHub.server.notificationCheck(accountService.getUserName());
                }
            }, 5000);

            this.notificationCheck();
            

            //$.connection.notificationHub.client.notificationCount = function notificationCount(newCount) {
            //   .totalCount = newCount;
                
            //        console.log(newCount);

            //    scope.$apply();
            //}

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

            console.log(this.loginUser);

            this.accountService.login(this.loginUser).then(() => {
                //this.$location.path('/');
                //this.AccountController.signalrLogin();
                document.location.reload();
                this.$uibModalInstance.close();
                
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: ng.ui.IStateService 
        )
        {

        }
    }


    export class RegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.register(this.registerUser).then(() => {
                this.$location.path('/');
                document.location.reload();
            }).catch((results) => {
                this.validationMessages = results;
                });
                this.$state.go('profileEdit');
           
        }

        constructor(private accountService: GameSquad.Services.AccountService,
            private $location: ng.ILocationService,
            private $state: ng.ui.IStateService        ) { }
    }





    export class ExternalRegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.registerExternal(this.registerUser.username)
                .then((result) => {
                    this.$location.path('/');
                    document.location.reload();
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }

        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService) {}

    }

    export class ConfirmEmailController {
        public validationMessages;

        constructor(
            private accountService: GameSquad.Services.AccountService,
            private $http: ng.IHttpService,
            private $stateParams: ng.ui.IStateParamsService,
            private $location: ng.ILocationService
        ) {
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
