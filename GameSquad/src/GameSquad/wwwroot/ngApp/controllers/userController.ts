namespace GameSquad.Controllers {
    export class UserController {
        public users;
        public pageCount = 0;

        constructor(private userService: GameSquad.Services.UserService, private $state: angular.ui.IStateService, private friendRequestService: GameSquad.Services.FriendRequestService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.getAllUsers(this.pageCount);
        }

        public showMessageModal(userId: string) {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/modals/messageModal.html",
                controller: GameSquad.Controllers.MessageCreateController,
                controllerAs: "controller",
                resolve: { userId: () => userId },
                size: "sm"
            });
        }

        //get all Users to display
        public getAllUsers(pageCount) {
            this.users = this.userService.getAllUsers(pageCount);
            if (pageCount <= 0) {
                document.getElementById("previous").hidden = true;
            }
            else if (pageCount > 0) {
                document.getElementById("previous").hidden = false;
            }
            if (this.users.count < 5) {
                document.getElementById("next").hidden = true;
            }
            else if (this.users.count == 5) {
                document.getElementById("next").hidden = false;
            }
        }

        public nextPage() {
            this.pageCount++;
            this.getAllUsers(this.pageCount);
        }

        public prevPage() {
            this.pageCount--;
            this.getAllUsers(this.pageCount);
        }

        public sendFriendRequest(user) {
            this.friendRequestService.sendFriendRequest(user).then(() => {
                var rowToChange = angular.element(document.querySelector('#' + user.userName));
                rowToChange.addClass('btn-warning disabled');
                rowToChange.html('Friend request sent!');
            })
        }
    }
}