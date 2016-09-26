namespace GameSquad.Controllers {

    export class FriendController {

        public friends;

        constructor(private FriendService: GameSquad.Services.FriendService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private accountService: GameSquad.Services.AccountService,
            private $stateParams: angular.ui.IStateParamsService)
            {
            this.getFriends(); 
        }

        public getFriends() {
            this.friends = this.FriendService.getFriends();
        }
    }
}