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

        //Signalr Chat stuff, probably temp
        public messages = [];
        public newMessage;
        private chatHub: any

        public sendMessage() {
            let username = this.getUserName();
            let messageToSend = { username: username, message: this.newMessage }
            console.log(messageToSend);
            this.chatHub.server.sendMessage(messageToSend);
            console.log("Message sent to server");

            this.chatHub.newMessage = "";
            this.newMessage = "";
        }

        public waitForMessages() {
            let messagelist = this.messages;
            let scope = this.$scope;

            this.chatHub.client.newMessage = function onNewMessage(messageRecieved) {
                console.log("Message Recieved from server!");

                messagelist.push(messageRecieved);
                console.log(messagelist);
                scope.$apply();

            };

        }

        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $scope: ng.IScope
        ) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });

            //signalr thing
            this.chatHub = $.connection.chatHub;
            this.waitForMessages();
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
