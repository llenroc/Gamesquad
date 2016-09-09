namespace GameSquad.Controllers {
    export class UserSearchController {
        public users;
        constructor(
            private userSearchService: GameSquad.Services.UserSearchService,
            private $state: angular.ui.IStateService
        ) {
            this.getAllUsers();
        }
        //get all Users to display
        public getAllUsers() {
            this.users = this.userSearchService.getAllUsers();
        }
        //get single id
        //private getUserById() {
        //    this.getUserById = this.userSearchService.getUserById(this.userId);
        //}
    }
}