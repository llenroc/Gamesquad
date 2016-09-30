namespace GameSquad.Controllers {
    export class UserController {
        public users;

        constructor(
            private userService: GameSquad.Services.UserService,
            private $state: angular.ui.IStateService,
            private friendRequestService: GameSquad.Services.FriendRequestService,
            private $uibModal: angular.ui.bootstrap.IModalService
        ) {
            this.getAllUsers();
        }
        public showMessageModal(eventId: number) {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/modals/messageModal.html",
                controller: GameSquad.Controllers.MessageController,
                controllerAs: "controller",
                resolve: { eventId: () => eventId },
                size: "sm"
            });
        }
        //get all Users to display
        public getAllUsers() {
            this.users = this.userService.getAllUsers();
            console.log(this.users);
        }

        

        //get single id
        //private getUserById() {
        //    this.getUserById = this.userService.getUserById(this.userId);
        //}

        public sendFriendRequest(user) {
            
            this.friendRequestService.sendFriendRequest(user).then(() => {
                var rowToChange = angular.element(document.querySelector('#' + user.userName));
                rowToChange.addClass('btn-warning disabled');
                rowToChange.html('Friend request sent!');
            })
        }
    }
}