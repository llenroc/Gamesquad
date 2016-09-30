﻿namespace GameSquad.Controllers {

    export class MessageController {
        public messages


        constructor(
            private messageService: GameSquad.Services.MessageService,
            private userService: GameSquad.Services.UserService,
            private $state: angular.ui.IStateService,
            private $uibModal: angular.ui.bootstrap.IModalService
        ) {
            this.msgsByUser();
        }


        public msgsByUser() {
            this.messageService.getMsgsByUser().$promise.then((data) => {
                this.messages = data.messages;
                console.log(this.messages);
            });
        }
    }
}