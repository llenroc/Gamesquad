namespace GameSquad.Controllers {

    declare var $;



    export class ChatController {
        //SignalR Global Messaging
        private chatHub: any
        public dupUser = false;
        public newMessage;
        public mobileView = 'conversations';



        


        //private messaging fields
        public sendToUser =
        {
            username: "",
            messages: [],
            newMessageAlert: false
        };
        
        public teamList = [];

        public privateMessageArray = [
            {
                username: "Dummy User 1",
                messages: [],
                newMessageAlert: false,
                online: true
            },
            {
                username: "Dummy User 2",
                messages: [],
                newMessageAlert: false,
                online: true
            }
        ];
        public groupMessageArray = [];
        public globalMessages = [];

        public messagesDispalyed;
        public newMessagePanelAlert;
        public newGroupMessagePanelAlert;
        public chatWindowOpen = false
        public sendTo;
        public teamToSend;
        public userListAlert = false;
        public conversationName;
        public userOnlineCheck;

        //CHecks if logged in
        public isLoggedIn() {
            return this.accountService.isLoggedIn();

        }

        //Gets username
        public getUserName() {
            return this.accountService.getUserName();
        }

        //allows for and dismisses the panel new message alerts
        public setPanelAlert() {
            this.chatWindowOpen = !this.chatWindowOpen;
            this.newMessagePanelAlert = false;
            this.newGroupMessagePanelAlert = false;
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
                    messages: [],
                    newMessageAlert: false,
                    online: true

                }
                this.privateMessageArray.push(newConversation);
                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(this.sendToUser.username);
                this.messagesDispalyed = this.privateMessageArray[index].messages;
                
            }
            this.userOnlineCheck = user.online;
            this.sendTo = "private";
            this.mobileView = "chat";
            //this.$scope.$apply;



        }

        public setTeamToMesssage(team) {
            //this.sendToUser = team;
            this.conversationName = team;
            let index = this.groupMessageArray.map((x) => { return x.roomName }).indexOf(team);
            if (index > -1) {
                this.messagesDispalyed = this.groupMessageArray[index].messages;
                this.sendTo = "team";
                this.teamToSend = team;
                this.userOnlineCheck = true;
                this.mobileView = "chat";

            }

            //this.$scope.$apply;

        }
        public setGlobalToMessage() {
            //this.sendToUser = team;
            this.conversationName = "Global Chat";
            
            this.messagesDispalyed = this.globalMessages;
            this.sendTo = "global";
            this.userOnlineCheck = true;
            this.mobileView = "chat";

            //this.$scope.$apply;

        }


        //Sets the class for a user whether selected or has a new message
        public conversationListClass(convoName, type) {
            let index;
            let conversation;
            //Checks if it is a private or group message
            if (type === 'private') {
                index = this.privateMessageArray.map((x) => { return x.username }).indexOf(convoName);
                conversation = this.privateMessageArray[index];
            }

            else {
                index = this.groupMessageArray.map((x) => { return x.roomName }).indexOf(convoName);
                conversation = this.groupMessageArray[index];
            }
            
            
            if (convoName === this.conversationName) {
                conversation.newMessageAlert = false;
                return 'list-group-item-warning'
            }

            else if (conversation.newMessageAlert) {
                return 'list-group-item-success'
            }
            else {
                return ''
            }

            
        }
        
        //Determins which sending method to use based on who you are messaging
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

            this.chatHub.server.sendPrivateMessage(this.newMessage, this.conversationName);
            this.newMessage = "";

        }

        //sends global message
        public sendGlobalMessage() {
            this.chatHub.server.sendMessage(this.newMessage);

            this.newMessage = "";
        }

        //sends group message
        public sendTeamMessage() {
            let messageTosend = this.newMessage;
            let roomName = this.teamToSend;

            this.chatHub.server.sendGroupMessage(messageTosend, roomName);
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

        //Waits for messages and other signalr stuff from server
        public waitMessages() {

            //Gets new global message
            this.chatHub.client.newMessage = (fromUserName, messageRecieved) => {
                let time = this.getTimeStamp();
                let newMessage = { username: fromUserName, message: messageRecieved, time: time}

                this.globalMessages.push(newMessage);
                this.$scope.$apply();
            }



            //Gets private message
            this.chatHub.client.getPrivateMessage = (fromUsername, privateMessage, conversationName) => {

                let newMessageTime = this.getTimeStamp();

                let newMessage = { username: fromUsername, message: privateMessage, time: newMessageTime };

                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(conversationName);
                if (index > -1) {

                    let chosenUser = this.privateMessageArray[index];

                    chosenUser.messages.push(newMessage);
                    chosenUser.newMessageAlert = true;

                    if (newMessage.username != this.getUserName()) {
                        this.userListAlert = true;

                        if (!this.chatWindowOpen) {
                            this.newMessagePanelAlert = true;
                        }
                        
                    }

                }

                this.$scope.$apply();
            }
            //Gets group message
            this.chatHub.client.getGroupMessage = (fromUsername, groupMessage, groupName) => {

                let newMessageTime = this.getTimeStamp();

                let newMessage = { username: fromUsername, message: groupMessage, time: newMessageTime}

                let index = this.groupMessageArray.map((x) => { return x.roomName }).indexOf(groupName);

                if (index > -1) {
                    let chosenGroup = this.groupMessageArray[index];

                    chosenGroup.messages.push(newMessage);
                    
                    //Makes it so it doesn't send notification alerts when it recieves a new user joined room message
                    if (newMessage.username != this.getUserName() && newMessage.username != 'Server'){
                        chosenGroup.newMessageAlert = true;

                        if (!this.chatWindowOpen) {
                            this.newGroupMessagePanelAlert = true;
                        }

                    }
                }

                this.$scope.$apply();
                
            }

            


        }


        //Gets connected users
        public getConnectedUsers() {

            //Recieves user list
            this.chatHub.client.onConnected = (userList) => {

                //If it detects this user is already connected it kils connection(fixes current duplicate issue)
                if (userList === -1) {

                    this.dupUser = true;
                    
                }
                //Sets up the user object for the connected users
                else {
                    for (var user of userList) {
                        let friend = {
                            username: user.userName,
                            messages: [],
                            newMessageAlert: false,
                            online: user.online
                        }
                        
                        this.privateMessageArray.push(friend);

                    }
                }
                this.$scope.$apply();

            }

            //Detects when a new user has been connected
            this.chatHub.client.onNewUserConnected = (newUser) => {

                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(newUser);
                if (index > -1) {
                    this.privateMessageArray[index].online = true;

                    //Enables message input if the user has the chat open to this user and it was disabled
                    if (this.conversationName === this.privateMessageArray[index].username) {
                        this.userOnlineCheck = true;
                    }
                }
                else {
                    let newFriend = {
                        username: newUser,
                        messages: [],
                        newMessageAlert: false,
                        online: true
                    }
                    
                    this.privateMessageArray.push(newFriend);
                }


                this.$scope.$apply();

            }

            //Sets user offline if they disconnect
            this.chatHub.client.onUserDisconnected = (userOffline) => {


                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(userOffline);
                if (index > -1) {

                    this.privateMessageArray[index].online = false;

                    //Disables message input if the user has the chat open to this user
                    if (this.conversationName === this.privateMessageArray[index].username) {
                        this.userOnlineCheck = false;
                    }

                    this.$scope.$apply();
                }

            }

            //Removes a friend from list if users are no longer friends
            this.chatHub.client.onFriendRemoved = (friendRemoved) => {
                let index = this.privateMessageArray.map((x) => { return x.username }).indexOf(friendRemoved);
                if (index > -1) {

                    
                    this.privateMessageArray.splice(index, 1);
                    if (this.conversationName === friendRemoved) {
                        this.setGlobalToMessage();
                    }
                    this.$scope.$apply();
                }
            }

            //If user joins a new group on the server this method is triggered and will join it in signalr
            this.chatHub.client.joinNewGroup = (roomName) => {
                this.connectToTeam(roomName);
                this.teamList.push({ teamName: roomName });


            }

            //Removes group from list of groups
            this.chatHub.client.leaveGroup = (roomToLeave) => {
                this.chatHub.server.leaveRoom(roomToLeave);
                let index = this.teamList.map((x) => { return x.teamName }).indexOf(roomToLeave);
                if (index > -1) {
                    this.teamList.splice(index, 1);
                    if (this.conversationName === roomToLeave) {
                        this.setGlobalToMessage();
                    }
                    this.$scope.$apply();
                }


            }

            

        }

        //Gets team from service and joins the groups on signalr
        public getTeamsAndConnect() {
            this.teamService.getTeamsByUser().$promise.then((data) => {
                this.teamList = data;

                for (let team of this.teamList) {
                    this.connectToTeam(team.teamName);
                }
            });
        }

        //method to join group, and also create new object in the groupmessage array
        public connectToTeam(roomName) {
            this.chatHub.server.joinRoom(roomName);
            let newConversation = {
                roomName: roomName,
                messages: []
            }
            this.groupMessageArray.push(newConversation);
        }

        public testNum;
        constructor(private accountService: GameSquad.Services.AccountService,
            private teamService: GameSquad.Services.TeamService,
            private $scope: ng.IScope
            
        ) {
            


            this.chatHub = $.connection.chatHub;
            //Starts the waiting functions for chat
            this.getConnectedUsers();
            this.waitMessages();
            this.setGlobalToMessage();

            //this.getTeamsAndConnect();

            setTimeout(() => { this.getTeamsAndConnect() }, 2000);

        }


    }

    angular.module('GameSquad').controller('ChatController', ChatController);
}