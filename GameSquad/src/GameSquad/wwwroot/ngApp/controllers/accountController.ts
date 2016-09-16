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

        //Signalr Chat stuff, probably temp
        private chatHub: any
        public messages = [];
        public newMessage;
        public connectedUsers = [];

        public test = "Hi!";

            //Signalr private messaging
        public sendToUser;
        public openPrivateChat;
        public newPrivateMessage;
        public privateMessageArray = [];
        public privateMessagesDispalyed;
        public newMessageAlertUser; 

        public setUserToMessage(username) {
            this.sendToUser = username;
            let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(this.sendToUser);

            if (index > -1) {
                //privateMessageArray.splice(index, 1);

                this.privateMessagesDispalyed = this.privateMessageArray[index].messages;
            }
            else {
                let newConversation = {
                    username: this.sendToUser,
                    messages: []
                }
                this.privateMessageArray.push(newConversation);
                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(this.sendToUser);
                this.privateMessagesDispalyed = this.privateMessageArray[index].messages;
            }
            this.openPrivateChat = true;
            this.$scope.$apply;



        }

        //sends private message
        public sendPrivateMessage() {
            let fromUsername = this.getUserName();
            //let messageToSend = { username: username, message: this.newPrivateMessage }

            //this.chatHub.server.sendPrivateMessage(messageToSend, this.sendToUser);
            this.chatHub.server.sendPrivateMessage(fromUsername, this.newPrivateMessage, this.sendToUser);
            this.newPrivateMessage = "";




        }

        //sends global message
        public sendMessage() {
            let username = this.getUserName();
            let messageToSend = { username: username, message: this.newMessage }
            console.log(messageToSend);
            this.chatHub.server.sendMessage(messageToSend);
            console.log("Message sent to server");

            this.newMessage = "";
        }

        public waitForMessages() {
            let messagelist = this.messages;
            let scope = this.$scope;
            let privateMessageArray = this.privateMessageArray;
            let messageAlert = this.newMessageAlertUser;

            this.chatHub.client.newMessage = function onNewMessage(messageRecieved) {
                console.log("Message Recieved from server!");

                messagelist.push(messageRecieved);
                console.log(messagelist);
                scope.$apply();

            };

            this.chatHub.client.getPrivateMessage = function onNewMessage(fromUsername, privateMessage, conversationName) {
                console.log("Private message Recieved from server!");

                

                let newMessage = { username: fromUsername, message: privateMessage };

                let index = privateMessageArray.map((x) => { return x.username }).indexOf(conversationName);
                console.log(index);
                if (index > -1) {
                    

                    let chosenUser = privateMessageArray[index];

                    chosenUser.messages.push(newMessage);
                }
                else {
                    let newConversation = {
                        username: conversationName,
                        messages: [newMessage]
                    }
                    privateMessageArray.push(newConversation);
                }
                messageAlert = conversationName;
                console.log(messageAlert);
                scope.$apply();


            };

        }

        

        public getConnectedUsers() {
            let connectedUsers = this.connectedUsers;
            let scope = this.$scope;

            this.chatHub.client.onConnected = function onConnected(userList) {
                console.log("Userlist Recieved from server!");

                console.log(userList + typeof userList);

                for (var user of userList) {
                    connectedUsers.push(user);
                    console.log(user.Username);
                }

                //connectedUsers = userList;

                console.log(connectedUsers);
                scope.$apply();
                //connectedUsers = userList;

            }

            this.chatHub.client.onNewUserConnected = function onNewUserConnected(newUser) {
                console.log("New user Recieved from server!");

                connectedUsers.push(newUser);
                console.log(connectedUsers);

                scope.$apply();

            }
            this.chatHub.client.onUserDisconnected = function onUserDisconnected(userToRemove) {
                console.log("User has disconnected " + userToRemove);
                

                let index = connectedUsers.map((x) => { return x.Username }).indexOf(userToRemove);
                console.log(index);
                if (index > -1) {
                    connectedUsers.splice(index, 1);
                    scope.$apply();
                }

            }

        }

        public signalrStart() {

            let userName = this.accountService.getUserName();

            $.connection.hub.logging = true;
            if (this.isLoggedIn()) {
                $.connection.hub.start().done(function () {
                    //sends username to Server
                    $.connection.chatHub.server.connect(userName);
                });
                $.connection.hub.error(function (err) {
                    console.log("An error occurded: " + err);
                });

                //signalr waiting methods
                this.waitForMessages();
                this.getConnectedUsers();
           }
        }


        constructor(private accountService: GameSquad.Services.AccountService, private $location: ng.ILocationService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $scope: ng.IScope
        ) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });

            //signalr thing
            console.log("This constructor runnign");

            this.chatHub = $.connection.chatHub;

            console.log(this.isLoggedIn() + "Hi");


            angular.element(document).ready(() => {
                this.signalrStart();

            })
            
            
            

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
        ) { }
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
