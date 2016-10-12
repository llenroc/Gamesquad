namespace GameSquad.Controllers {

    declare var $;



    export class ChatController {
        //SignalR Global Messaging
        private chatHub: any
        public globalMessages = [];
        public newMessage;
        public dupUser = false;
        public teamList;

        public messageType;


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
        public groupMessageArray = [];
        public messagesDispalyed;
        public newMessageAlertUser;
        public sendTo;
        public teamToSend;
        public userListAlert = false;
        public conversationName;

        //CHecks if logged in
        public isLoggedIn() {
            return this.accountService.isLoggedIn();

        }

        //Gets username
        public getUserName() {
            return this.accountService.getUserName();
        }

        //Sets which user you are messaging
        public setUserToMessage(user) {
            this.sendToUser = user;
            this.conversationName = user.username;
            let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(this.sendToUser.username);

            if (index > -1) {

                this.messagesDispalyed = this.privateMessageArray[index].messages;
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
                this.messagesDispalyed = this.privateMessageArray[index].messages;
            }
            this.openPrivateChat = true;
            this.sendTo = "private";
            //this.$scope.$apply;



        }

        public setTeamToMesssage(team) {
            //this.sendToUser = team;
            this.conversationName = team;
            console.log(`changed to ${team}`);
            let index = this.groupMessageArray.map((x) => { return x.roomName }).indexOf(team);
            if (index > -1) {
                this.messagesDispalyed = this.groupMessageArray[index].messages;
                this.sendTo = "team";
                this.teamToSend = team;
            }

            //this.$scope.$apply;

        }
        public setGlobalToMessage() {
            //this.sendToUser = team;
            this.conversationName = "Global Chat";
            console.log(`changed to global`);
            
            this.messagesDispalyed = this.globalMessages;
            this.sendTo = "global";
            
            

            //this.$scope.$apply;

        }


        //Sets the class for a user whether selected or has a new message
        public userListClass(username) {
            let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(username);
            let conversation = this.privateMessageArray[index];




            if (conversation.username === this.sendToUser.username) {
                conversation.newMessageAlert = false;
                return 'list-group-item-warning'
            }

            else if (conversation.newMessageAlert) {
                return 'list-group-item-success'
            }
            else {
                return ""
            }

        }

        

        public sendMessage() {
            if (this.sendTo === 'private') {
                this.sendPrivateMessage();
            }
            else if (this.sendTo === 'team') {
                this.sendTeamMessage();
            }
            else if (this.sendTo === 'global') {
                this.sendGlobalMessage();
            }
        }

        //sends private message
        public sendPrivateMessage() {
            let fromUsername = this.accountService.getUserName();

            //just in case check. Sometimes has issue
            let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(this.sendToUser.username);
            let userToSend = this.privateMessageArray[index];

            this.chatHub.server.sendPrivateMessage(fromUsername, this.newMessage, userToSend.username, userToSend.connectionId);
            this.newMessage = "";

        }

        //sends global message
        public sendGlobalMessage() {
            let username = this.accountService.getUserName();
            let messageToSend = { username: username, message: this.newMessage }
            console.log(messageToSend);
            this.chatHub.server.sendMessage(messageToSend);
            console.log("Message sent to server");

            this.newMessage = "";
        }

        //sends group message
        public sendTeamMessage() {
            let username = this.accountService.getUserName();
            let messageTosend = this.newMessage;
            let roomName = this.teamToSend;

            this.chatHub.server.sendGroupMessage(username, messageTosend, roomName);
            this.newMessage = "";
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

        //Waits for messages from server
        public waitForMessages() {


            this.chatHub.client.newMessage = (messageRecieved) => {
                console.log("Message Recieved from server!");

                this.globalMessages.push(messageRecieved);
                console.log(this.globalMessages);
                this.$scope.$apply();
            }



            //Gets private message
            this.chatHub.client.getPrivateMessage = (fromUsername, privateMessage, conversationName) => {
                console.log("Private message Recieved from server!");

                let newMessageTime = this.getTimeStamp();

                let newMessage = { username: fromUsername, message: privateMessage, time: newMessageTime };

                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(conversationName);
                if (index > -1) {

                    let chosenUser = this.privateMessageArray[index];

                    chosenUser.messages.push(newMessage);
                    chosenUser.newMessageAlert = true;

                    if (newMessage.username != this.getUserName()) {
                        this.userListAlert = true;

                    }

                }

                this.$scope.$apply();
            }
            //Gets group message
            this.chatHub.client.getGroupMessage = (fromUsername, groupMessage, groupName) => {
                console.log("Group message Recieved from server!");

                let newMessageTime = this.getTimeStamp();

                let newMessage = { username: fromUsername, message: groupMessage, time: newMessageTime}
                console.log(newMessage);

                let index = this.groupMessageArray.map((x) => { return x.roomName }).indexOf(groupName);

                if (index > -1) {
                    let chosenGroup = this.groupMessageArray[index];

                    chosenGroup.messages.push(newMessage);
                }

                this.$scope.$apply();
                
            }
        }


        //Gets connected users
        public getConnectedUsers() {

            //Recieves user list
            this.chatHub.client.onConnected = (userList) => {
                console.log("Userlist Recieved from server!");

                console.log(userList + typeof userList);
                //If it detects this user is already connected it kils connection(fixes current duplicate issue)
                if (userList === 0) {
                    $.connection.hub.stop();
                    this.dupUser = true;
                }
                //Sets up the user object for the connected users
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

            //Detechts when a new user has been connected
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

        public getTeamsAndConnect() {
            this.teamService.getTeamsByUser().$promise.then((data) => {
                this.teamList = data;
                console.log(this.teamList);

                for (let team of this.teamList) {
                    this.chatHub.server.joinRoom(team.teamName)
                    let newConversation = {
                        roomName: team.teamName,
                        messages: []
                    }
                    this.groupMessageArray.push(newConversation);
                }
            });
        }

        public connectToTeam() {

        }

        constructor(private accountService: GameSquad.Services.AccountService,
            private teamService: GameSquad.Services.TeamService,
            private $scope: ng.IScope
        ) {
            console.log("Chat Constructor Running!");
            this.chatHub = $.connection.chatHub;
            //Starts the waiting functions for chat
            this.getConnectedUsers();
            this.waitForMessages();
            this.setGlobalToMessage();

            //this.getTeamsAndConnect();

            setTimeout(() => { this.getTeamsAndConnect() }, 2000);

        }


    }

    angular.module('GameSquad').controller('ChatController', ChatController);
}