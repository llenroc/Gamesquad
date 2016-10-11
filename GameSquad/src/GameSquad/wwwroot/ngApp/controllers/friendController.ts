namespace GameSquad.Controllers {

    export class FriendController {

        public friends;
        public friendId;
        constructor(private FriendService: GameSquad.Services.FriendService,
            private friendRequestService: GameSquad.Services.FriendRequestService,
            private accountService: GameSquad.Services.AccountService,
            private $stateParams: angular.ui.IStateParamsService, private $state: angular.ui.IStateService) {
            this.getFriends();
        }

        public getFriends() {
            this.friends = this.FriendService.getFriends();
        }

        public getFriendsById(friendId) {
            this.friendId = this.FriendService.getFriendsById(this.friendId);
        }

        public getFriendsByUser() {
            this.FriendService.getFriendsByUser().$promise.then((data) => {
                this.friends = data;
            });
        }

        public addFriendToUser(friendId) {
            this.FriendService.addFriendToUser(friendId);
        }

        public removeFriend(friendId) {
            this.FriendService.removeFriend(friendId).then(() => {
                this.getFriends();
            });
        }
    }

    angular.module('GameSquad').controller('FriendController', FriendController);
}