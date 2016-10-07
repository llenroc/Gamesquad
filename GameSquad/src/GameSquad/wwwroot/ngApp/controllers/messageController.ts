﻿namespace GameSquad.Controllers {

    export class MessageController {
        public messages;
        public friendRequests;


        constructor(
            private messageService: GameSquad.Services.MessageService,
            private userService: GameSquad.Services.UserService,
            private friendRequestService: GameSquad.Services.FriendRequestService,
            private $state: angular.ui.IStateService,
            private $uibModal: angular.ui.bootstrap.IModalService
        ) {
            this.msgsByUser();
            this.friendRequestsByUser();
        }


        public msgsByUser() {
            this.messageService.getMsgsByUser().$promise.then((data) => {
                this.messages = data.messages;
                console.log(this.messages);
            });
        }

        public friendRequestsByUser() {
            this.friendRequests = this.friendRequestService.getFriendRequests();
            
        }
    }
}