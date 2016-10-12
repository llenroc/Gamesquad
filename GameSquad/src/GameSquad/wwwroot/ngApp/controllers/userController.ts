﻿namespace GameSquad.Controllers {
    export class UserController {
        public users;
        public pageCount = 0;
        public data = { pageCount: 0, username: "", rankFrom: 0, rankTo: 0, onlineOnly: false, lookingFor: "" };

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
            this.userService.getAllUsers(this.data).then((_data) => {
                this.users = _data.data;
                if (pageCount <= 0) {

                    document.getElementById("previous").style.visibility = "hidden";
                }
                else if (pageCount > 0) {

                    document.getElementById("previous").style.visibility = "visible";
                }
                if (this.users.count < 5) {

                    document.getElementById("next").style.visibility = "hidden";
                }
                else if (this.users.count == 5) {

                    document.getElementById("next").style.visibility = "visible";
                }
            });
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