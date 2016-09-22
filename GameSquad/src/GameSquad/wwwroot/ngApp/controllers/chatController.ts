namespace GameSquad.Controllers {

    declare var $;

    export class ChatController {
        //SignalR Global Messaging
        private chatHub: any
        public messages = [];
        public newMessage;
        public dupUser = false;

        //total connected users
        public connectedUsers = [
            {
                Username: "Dummy User 1",
                ConnectionId: "none"
            },
            {
                Username: "Dummy User 2",
                ConnectionId: "none"


            }
        ];

        //private messaging fields
        public sendToUser;
        public openPrivateChat;
        public newPrivateMessage;
        public privateMessageArray = [
            
        ];
        public privateMessagesDispalyed;
        public newMessageAlertUser;

        public isLoggedIn() {
            return this.accountService.isLoggedIn();

        }

        public getUserName() {
            return this.accountService.getUserName();
        }

        public setUserToMessage(user) {
            this.sendToUser = user;
            let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(this.sendToUser.Username);

            if (index > -1) {
                //privateMessageArray.splice(index, 1);

                this.privateMessagesDispalyed = this.privateMessageArray[index].messages;
            }
            else {
                let newConversation = {
                    username: this.sendToUser.Username,
                    connectionId: this.sendToUser.ConnectionId,
                    messages: [],
                    newMessageAlert: false

                }
                this.privateMessageArray.push(newConversation);
                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(this.sendToUser.Username);
                this.privateMessagesDispalyed = this.privateMessageArray[index].messages;
            }
            this.openPrivateChat = true;
            this.$scope.$apply;



        }

        //TODO: Merge the connected user and private message arrays so don't have to do as many array maps

        //Ignore this: ng-class="{'list-group-item-success': chat.newMessageAlertUser == user.Username,'list-group-item-info': chat.sendToUser.Username == user.Username}"

        public userListClass(username) {
            let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(username);
            let conversation = this.privateMessageArray[index];

            console.log(conversation);
            console.log(this.sendToUser.Username);

            if (conversation.newMessageAlert != null) {

                if (conversation.username === this.sendToUser.Username) {
                    conversation.newMessageAlert = false;
                    return 'list-group-item-info'
                }
                
                else if (conversation.newMessageAlert) {
                    return 'list-group-item-success'
                }
            }
            
            else {
                return ""
            }

        }

        //sends private message
        public sendPrivateMessage() {
            let fromUsername = this.accountService.getUserName();

            //just in case check. Sometimes has issue
            let index = this.connectedUsers.map((x) => { return x.Username }).indexOf(this.sendToUser.Username);
            let userToSend = this.connectedUsers[index];

            this.chatHub.server.sendPrivateMessage(fromUsername, this.newPrivateMessage, userToSend.Username, userToSend.ConnectionId);
            this.newPrivateMessage = "";

        }

        //sends global message
        public sendMessage() {
            let username = this.accountService.getUserName();
            let messageToSend = { username: username, message: this.newMessage }
            console.log(messageToSend);
            this.chatHub.server.sendMessage(messageToSend);
            console.log("Message sent to server");

            this.newMessage = "";
        }

        //Waits for messages from server
        public waitForMessages() {
            let messagelist = this.messages;
            let scope = this.$scope;
            let privateMessageArray = this.privateMessageArray;
            let messageAlert;

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
                    chosenUser.newMessageAlert = true;
                }
                else {
                    let newConversation = {
                        username: conversationName,
                        messages: [newMessage],
                        newMessageAlert: true

                    }
                    privateMessageArray.push(newConversation);
                }
                //console.log(messageAlert);

                //messageAlert = conversationName;
                //console.log(messageAlert);
               
                scope.$apply();


            };
           // this.newMessageAlertUser = messageAlert;

        }



        public getConnectedUsers() {
            let connectedUsers = this.connectedUsers;
            let scope = this.$scope;
            let dupUser = this.dupUser;

            this.chatHub.client.onConnected = function onConnected(userList) {
                console.log("Userlist Recieved from server!");

                console.log(userList + typeof userList);

                if (userList === 0) {
                    $.connection.hub.stop();
                    dupUser = true;
                }

                else {
                    for (var user of userList) {
                        connectedUsers.push(user);
                        console.log(user.Username);
                    }
                    console.log(connectedUsers);
                }
                scope.$apply();


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


            if (this.accountService.isLoggedIn()) {
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

        public signalrWait() {

        }

        constructor(private accountService: GameSquad.Services.AccountService,
            private $scope: ng.IScope
        ) {

            console.log("Chat Constructor Running!");
            this.chatHub = $.connection.chatHub;
            $.connection.hub.logging = true;

            

            setTimeout(function () {
                console.log("hi!");
                if (accountService.isLoggedIn()) {
                    let userName = accountService.getUserName();

                    $.connection.hub.start().done(function () {
                        //sends username to Server
                        $.connection.chatHub.server.connect(userName);
                    });
                    $.connection.hub.error(function (err) {
                        console.log("An error occurded: " + err);
                    });

                    //signalr waiting methods
                    //this.waitForMessages();
                    //this.getConnectedUsers();
                }
            }, 2000);

            this.waitForMessages();
            this.getConnectedUsers();
            
            
            //function signalrWait() {
            //    setTimeout(function () {
                   
            //    }, 2000);
            //} ();

        }

       
    }

    angular.module('GameSquad').controller('ChatController', ChatController);
}