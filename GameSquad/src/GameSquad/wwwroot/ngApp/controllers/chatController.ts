namespace GameSquad.Controllers {

    declare var $;

    

    export class ChatController {
        //SignalR Global Messaging
        private chatHub: any
        public messages = [];
        public newMessage;
        public dupUser = false;

        

        //private messaging fields
        public sendToUser = 
        {
            username: "",
            connectionId: "none",
            messages: [],
            newMessageAlert: false
        };
        public openPrivateChat;
        public newPrivateMessage;
        public privateMessageArray = [
            {
                username: "Dummy User 1",
                connectionId: "none",
                messages: [],
                newMessageAlert: false,
                online: true
            },
            {
                username: "Dummy User 2",
                connectionId: "none",
                messages: [],
                newMessageAlert: false,
                online: true
            }
        ];
        public privateMessagesDispalyed;
        public newMessageAlertUser;
        public notificationCount = { totalCount: 0 };

        //for the friendslist and private message alerds
        //needs to be an object with property for wierd scope reasons
        public userListAlert = { alertStatus: false };
        

        public isLoggedIn() {
            return this.accountService.isLoggedIn();

        }

        public getUserName() {
            return this.accountService.getUserName();
        }

        public setUserToMessage(user) {
            this.sendToUser = user;
            let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(this.sendToUser.username);

            if (index > -1) {
                //privateMessageArray.splice(index, 1);

                this.privateMessagesDispalyed = this.privateMessageArray[index].messages;
            }
            else {
                let newConversation = {
                    username: this.sendToUser.username,
                    connectionId: this.sendToUser.connectionId,
                    messages: [],
                    newMessageAlert: false,
                    online: true

                }
                this.privateMessageArray.push(newConversation);
                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(this.sendToUser.username);
                //this.privateAlert.alertStatus = this.privateMessageArray[index].newMessageAlert;
                this.privateMessagesDispalyed = this.privateMessageArray[index].messages;
            }
            this.openPrivateChat = true;
            this.$scope.$apply;



        }

       

        //Ignore this: ng-class="{'list-group-item-success': chat.newMessageAlertUser == user.Username,'list-group-item-info': chat.sendToUser.Username == user.Username}"

        public userListClass(username) {
            let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(username);
            let conversation = this.privateMessageArray[index];

            
            //console.log(this.sendToUser.username);

           // if (conversation.newMessageAlert != null) {

                if (conversation.username === this.sendToUser.username) {
                    conversation.newMessageAlert = false;
                    return 'list-group-item-info'
                }
                
                else if (conversation.newMessageAlert) {
                    return 'list-group-item-success'
                }
            //}
            
            else {
                return ""
            }

        }

        //sends private message
        public sendPrivateMessage() {
            let fromUsername = this.accountService.getUserName();

            //just in case check. Sometimes has issue
            let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(this.sendToUser.username);
            let userToSend = this.privateMessageArray[index];

            this.chatHub.server.sendPrivateMessage(fromUsername, this.newPrivateMessage, userToSend.username, userToSend.connectionId);
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
            let userListAlert = this.userListAlert;
            let getUsername = this.getUserName();
           

            this.chatHub.client.newMessage = function onNewMessage(messageRecieved) {
                console.log("Message Recieved from server!");

                messagelist.push(messageRecieved);
                console.log(messagelist);
                scope.$apply();

            };

            this.chatHub.client.getPrivateMessage = function onNewMessage(fromUsername, privateMessage, conversationName) {
                console.log("Private message Recieved from server!");



                let newMessage = { username: fromUsername, message: privateMessage, time: "" };

                let index = privateMessageArray.map((x) => { return x.username }).indexOf(conversationName);
                console.log(index);
                if (index > -1) {


                    let chosenUser = privateMessageArray[index];

                    //Get time
                    var messageDate = new Date();
                    function addZero(i) {
                        if (i < 10) {
                            i = "0" + i;
                        }
                        return i;
                    }
                    var messageTime = addZero(messageDate.getHours()) + ":" + addZero(messageDate.getMinutes()) ;

                    newMessage.time = messageTime;

                    chosenUser.messages.push(newMessage);
                    chosenUser.newMessageAlert = true;
                   
                    



                    if (newMessage.username != getUsername) {
                        userListAlert.alertStatus = true;

                    }


                }
                

                scope.$apply();


            };

            this.chatHub.client.getGroupMessage = function onNewMessage(fromUsername, groupMessage, groupName) {

                let newMessage = {username: fromUsername, message: groupMessage}
            }
            

        }



        public getConnectedUsers() {
            let connectedUsers = this.privateMessageArray;
            
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
                        user.messages = [];
                        user.newMessageAlert = false;
                        user.online = true;
                        connectedUsers.push(user);
                        //console.log(user.Username);
                    }
                    console.log(connectedUsers);
                }
                scope.$apply();


            }
            //{
        //    username: "Dummy User 2",
        //        connectionId: "none",
        //            messages: [],
        //                newMessageAlert: false,
        //                    online: true
        //}
            this.chatHub.client.onNewUserConnected = function onNewUserConnected(newUser) {
                console.log("New user Recieved from server!");
                console.log(newUser)
                //let why = newUser
                let index = connectedUsers.map((x) => { return x.username }).indexOf(newUser.username);
                if (index > -1) {
                    connectedUsers[index].connectionId = newUser.connectionId
                    connectedUsers[index].online = true;
                }
                else {

                    newUser.messages = [];
                    newUser.newMessageAlert = false;
                    newUser.online = true;
                    connectedUsers.push(newUser);
                }
                
                console.log(connectedUsers);

                scope.$apply();

            }
            this.chatHub.client.onUserDisconnected = function onUserDisconnected(userToRemove) {
                console.log("User has disconnected " + userToRemove);


                let index = connectedUsers.map((x) => { return x.username }).indexOf(userToRemove);
                console.log(index);
                if (index > -1) {

                   // if (connectedUsers[index].messages.length > 0) {
                        connectedUsers[index].online = false;
                    //}
                    //else {
                    //    connectedUsers.splice(index, 1);
                    //}
                    scope.$apply();
                }

            }

        }


        //maybe not needed?
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

                   
                }
            }, 2000);

            this.waitForMessages();
            this.getConnectedUsers();

        }

       
    }

    angular.module('GameSquad').controller('ChatController', ChatController);
}