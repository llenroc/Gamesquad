namespace GameSquad.Controllers {

    export class MessageInfoController {
        public messageDetails;

        constructor(private messageService: GameSquad.Services.MessageService, private userService: GameSquad.Services.UserService, $stateParams: ng.ui.IStateParamsService) {
            this.messageDetails = this.messageService.getMessageInfo($stateParams['id']);
        }
    }
}