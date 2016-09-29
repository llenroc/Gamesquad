namespace GameSquad.Controllers {

    export class MessageCreateController {

        public messageToCreate;
        constructor(
            private messageService: GameSquad.Services.MessageService,
            private $state: angular.ui.IStateService, private $uiBModalInstance: angular.ui.bootstrap.IModalServiceInstance) {


        }


        public saveMessage() {
            this.messageService.saveMessage(this.messageToCreate);
                //.then(() => {
                //    this.$state.go('message');
                //})
                //.catch(() => {
                //    console.log("Message didnt Save");
                //})
          
        }

    

    }







}