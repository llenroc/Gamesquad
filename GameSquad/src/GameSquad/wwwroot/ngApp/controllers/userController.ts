namespace GameSquad.Controllers {
    declare var $;
    export class UserController {
        public users;
        public data = { pageCount: 0, username: "", rankFrom: 0, rankTo: 400, onlineOnly: false, lookingFor: "", platform: "" };

        constructor(private userService: GameSquad.Services.UserService, private $state: angular.ui.IStateService, private friendRequestService: GameSquad.Services.FriendRequestService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.getAllUsers(this.data.pageCount);

            $(".table td a").popover({
                trigger: 'hover',
                placement: function (pop, ele) {
                    if ($(ele).parent().is('td:last-child')) {
                        return 'left'
                    } else {
                        return 'top'
                    }
                }
            });
            
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
            if (this.data.rankFrom < 0) {
                this.data.rankFrom = 0;
            }
            if (this.data.rankTo > 400) {
                this.data.rankTo = 400;

            }
            this.userService.getAllUsers(this.data).then((_data) => {
                this.users = [];
                this.users = _data.data;
                console.log("users");
                console.log(_data);
                var holder = [];
                for (var user of this.users) {
                    user.user.isFriend = user.isFriend;
                    holder.push(user.user);
                }
                this.users = holder;
                
                if (pageCount <= 0) {

                    document.getElementById("previous").style.visibility = "hidden";
                }
                else if (pageCount > 0) {

                    document.getElementById("previous").style.visibility = "visible";
                }
                if (this.users.length < 5) {

                    document.getElementById("next").style.visibility = "hidden";
                }
                else if (this.users.length == 5) {

                    document.getElementById("next").style.visibility = "visible";
                }
            });
        }

        public nextPage() {
            this.data.pageCount++;
            this.getAllUsers(this.data.pageCount);
        }

        public prevPage() {
            this.data.pageCount--;
            this.getAllUsers(this.data.pageCount);
        }

        public sendFriendRequest(user) {
            this.friendRequestService.sendFriendRequest(user).then(() => {
                //var rowToChange = angular.element(document.querySelector('#' + user.userName));
                //rowToChange.addClass('btn-warning disabled');
                //rowToChange.html('Friend request sent!');
            })
        }
    }
}