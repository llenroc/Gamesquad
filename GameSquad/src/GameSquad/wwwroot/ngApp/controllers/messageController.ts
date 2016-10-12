namespace GameSquad.Controllers {

    export class MessageController {
        public messages;
        public friendRequests;

        constructor(private FriendService: GameSquad.Services.FriendService, private messageService: GameSquad.Services.MessageService, private userService: GameSquad.Services.UserService, private $state: angular.ui.IStateService, private friendRequestService: GameSquad.Services.FriendRequestService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.msgsByUser();
            this.friendRequestsByUser();
            console.log(this.friendRequests);
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

        public addFriendToUser(friendId) {
            this.FriendService.addFriendToUser(friendId).then(() => {
                this.friendRequestsByUser();
            });
        }

        public deleteMessage(id) {
            this.messageService.deleteMessage(id).then(() => {
                this.msgsByUser();
            });
        }

        public removeFriendRequest(sendingUserId) {
            this.friendRequestService.removeFriendRequest(sendingUserId).then(() => {
                this.friendRequestsByUser();
            });
        }
    }
}