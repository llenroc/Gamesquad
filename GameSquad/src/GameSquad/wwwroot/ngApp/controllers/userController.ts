namespace GameSquad.Controllers {
    export class UserController {
        public users;
        constructor(
            private userService: GameSquad.Services.UserService,
            private $state: angular.ui.IStateService
        ) {
            this.getAllUsers();
        }
        //get all Users to display
        public getAllUsers() {
            this.users = this.userService.getAllUsers();
        }
        //get single id
        //private getUserById() {
        //    this.getUserById = this.userService.getUserById(this.userId);
        //}
    }
}