namespace GameSquad.Controllers {
    export class UserController {
        public users;

        constructor(
            private userService: GameSquad.Services.UserService,
            private $state: angular.ui.IStateService,
            private friendRequestService: GameSquad.Services.FriendRequestService
        ) {
            this.getAllUsers();
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
                angular.element(document.querySelector('#' + user.userName)).addClass('disabled');
            })
        }
    }
}