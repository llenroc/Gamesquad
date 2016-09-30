namespace GameSquad.Controllers {

    export class FriendController {

        public friends;
        public friendId;
        constructor(private FriendService: GameSquad.Services.FriendService,
            private accountService: GameSquad.Services.AccountService,
            private $stateParams: angular.ui.IStateParamsService) {
            this.getFriends();
            //this.getFriendsById(this.friendId);
            //this.getFriendsByUser();
        }

        public getFriends() {
            this.friends = this.FriendService.getFriends();
            //console.log(this.friends);
        }
        public getFriendsById(friendId) {
            this.friendId = this.FriendService.getFriendsById(this.friendId);
            //console.log(this.friendId);
        }
        public getFriendsByUser() {
            this.FriendService.getFriendsByUser().$promise.then((data) => {
                this.friends = data;
                //console.log(this.friends);
            });
        }
    }

    angular.module('GameSquad').controller('FriendController', FriendController );
}