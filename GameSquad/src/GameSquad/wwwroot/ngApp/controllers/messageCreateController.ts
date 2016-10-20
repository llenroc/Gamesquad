namespace GameSquad.Controllers {

    export class MessageCreateController {
        public messageToSend;
        

        constructor(private messageService: GameSquad.Services.MessageService, private userService: GameSquad.Services.UserService, private userId, private accountService: GameSquad.Services.AccountService, private $state: angular.ui.IStateService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) {

        }

        public sendMessage() {
            this.messageToSend.recId = this.userId;
            this.messageToSend.sendingUser = this.accountService.getUserName();
            this.messageService.sendMessage(this.messageToSend).
                then(() => {
                    this.$uibModalInstance.close();
                })
                .catch(() => {
                    console.log("Message didnt Save");
                })
        }

        public exit() {
            this.$uibModalInstance.close();
        }
    }
}