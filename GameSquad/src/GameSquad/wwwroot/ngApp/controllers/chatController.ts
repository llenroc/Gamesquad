//namespace GameSquad {

//    declare var $;

//    export class ChatController {
//        public messages;
//        public newMessage;
//        private chatHub: any


//        constructor(public $scope: ng.IScope) {
//            this.chatHub = $.connection.chatHub;

//        }

//        public sendMessage() {
//            console.log("Message sent to server");
//            this.chatHub.server.sendMessage(this.newMessage);
//            this.chatHub.newMessage = "";
//            this.newMessage = "";
//        }

//        public waitForMessages() {
//            let messagelist = this.messages;
//            let scope = this.$scope;

//            this.chatHub.client.newMessage = function onNewMessage(message) {
//                console.log("Message Recieved from server!");
                
//                messagelist.push({ message: message });
//                console.log(messagelist);
//                scope.$apply();

//            };

//        }
//    }

//    angular.module('GameSquad').controller('chatController', ChatController);
//}