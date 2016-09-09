namespace GameSquad.Controllers {

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
            this.$location.path('/');
        }

        public getExternalLogins() {
            return this.accountService.getExternalLogins();
        }

        //Launch Login Modal
        public loginModal() {
            console.log("IS this working?");
            this.$uibModal.open({
                templateUrl: 'ngApp/views/modals/modalLogin.html',
                controller: LoginController,
                controllerAs: 'modal',
            })
        }

        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService,
            private $uibModal: ng.ui.bootstrap.IModalService
        ) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });
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
                this.$location.path('/');
                this.$uibModalInstance.close();
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) { }
    }


    export class RegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.register(this.registerUser).then(() => {
                this.$location.path('/');
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService) { }
    }





    export class ExternalRegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.registerExternal(this.registerUser.email)
                .then((result) => {
                    this.$location.path('/');
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
