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
        //public notificationCount = { totalCount: 0 };

        //for the friendslist and private message alerds
        //needs to be an object with property for wierd scope reasons
        public userListAlert = false;
        

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

        // Calculates timestamp for message
        public getTimeStamp() {
            var messageDate = new Date();
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            var messageTime = addZero(messageDate.getHours()) + ":" + addZero(messageDate.getMinutes());

            return messageTime;
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
            

            this.chatHub.client.newMessage = (messageRecieved) {
                console.log("Message Recieved from server!");

                this.messages.push(messageRecieved);
                console.log(this.messages);
                this.$scope.$apply();
            }


            

            this.chatHub.client.getPrivateMessage = (fromUsername, privateMessage, conversationName) => {
                console.log("Private message Recieved from server!");
                let newMessage = { username: fromUsername, message: privateMessage, time: "" };

                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(conversationName);
                console.log(index);
                if (index > -1) {


                    let chosenUser = this.privateMessageArray[index];

                    newMessage.time = this.getTimeStamp();

                    chosenUser.messages.push(newMessage);
                    chosenUser.newMessageAlert = true;

                    if (newMessage.username != this.getUserName()) {
                        this.userListAlert = true;

                    }

                }

                this.$scope.$apply();
            }

        }

        

        public getConnectedUsers() {
            

            this.chatHub.client.onConnected = (userList) => {
                console.log("Userlist Recieved from server!");

                console.log(userList + typeof userList);

                if (userList === 0) {
                    $.connection.hub.stop();
                    this.dupUser = true;
                }

                else {
                    for (var user of userList) {
                        user.messages = [];
                        user.newMessageAlert = false;
                        user.online = true;
                        this.privateMessageArray.push(user);
                        
                    }
                    console.log(this.privateMessageArray);
                }
                this.$scope.$apply();

            }


            this.chatHub.client.onNewUserConnected = (newUser) => {
                console.log("New user Recieved from server!");
                console.log(newUser)
                
                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(newUser.username);
                if (index > -1) {
                    this.privateMessageArray[index].connectionId = newUser.connectionId
                    this.privateMessageArray[index].online = true;
                }
                else {

                    newUser.messages = [];
                    newUser.newMessageAlert = false;
                    newUser.online = true;
                    this.privateMessageArray.push(newUser);
                }

                console.log(this.privateMessageArray);

                this.$scope.$apply();

            }


            this.chatHub.client.onUserDisconnected = (userToRemove) => {
                console.log("User has disconnected " + userToRemove);


                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(userToRemove);
                console.log(index);
                if (index > -1) {

                    this.privateMessageArray[index].online = false;
                    
                    this.$scope.$apply();
                }

            }

        }


        constructor(private accountService: GameSquad.Services.AccountService,
            private $scope: ng.IScope
        ) {

            console.log("Chat Constructor Running!");
            this.chatHub = $.connection.chatHub;

            //Starts the waiting functions for chat
            this.getConnectedUsers();
            this.waitForMessages();

        }

       
    }

    angular.module('GameSquad').controller('ChatController', ChatController);
}