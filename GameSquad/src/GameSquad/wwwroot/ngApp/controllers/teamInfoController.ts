namespace GameSquad.Controllers {

    declare var $;

    export class TeamInfoController {

        public teamDetails;
        public chatHub;
        public messages = [];
        public newMessage;

        public sendGroupMessage() {
            let username = this.accountService.getUserName();
            let messageTosend = this.newMessage;
            let roomName = this.teamDetails.teamName

            this.chatHub.server.sendGroupMessage(username, messageTosend, roomName);
            this.newMessage = "";
        }

        public waitForMessages() {
            let messageList = this.messages;
            let scope = this.$scope;
            let team = this.teamDetails;

            this.chatHub.client.getGroupMessage = function onNewMessage(fromUsername, groupMessage, groupName) {


                var messageDate = new Date();
                function addZero(i) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }
                var messageTime = addZero(messageDate.getHours()) + ":" + addZero(messageDate.getMinutes());

                let newMessage = { username: fromUsername, message: groupMessage, time: messageTime }

                if (groupName === team.teamName) {
                    messageList.push(newMessage);
                    console.log(newMessage);
                    scope.$apply();
                }

            }
        }

        public getUserName() {
            return this.accountService.getUserName();
        }

        public startSignalRGroup() {
            var userName = this.getUserName();
            var roomName = this.teamDetails.teamName;

            var connectionCheck = setInterval(() => {
                if ($.connection.chatHub.state !== $.signalR.connectionState.connected) {
                    $.connection.chatHub.server.joinRoom("Cloud9", userName).done(() => { console.log("Joined Group!")});
                    clearInterval(connectionCheck);
                }
            }, 2000)
               
            
        }



        

        constructor(
            private teamService: GameSquad.Services.TeamService,
            private userService: GameSquad.Services.UserService,
            $stateParams: ng.ui.IStateParamsService,
            private $scope: ng.IScope,
            private accountService: GameSquad.Services.AccountService
        ) {
            this.teamDetails = this.teamService.getTeamInfo($stateParams['id']);
            this.chatHub = $.connection.chatHub;


            this.startSignalRGroup();
            //setTimeout(function () {
            //    console.log("Group Messaging starting!");

            //    $.connection.chatHub.server.joinRoom("Cloud9", accountService.getUserName());

            //}, 3000);


            this.waitForMessages();
        }

    }

}
