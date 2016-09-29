namespace GameSquad.Controllers {
    export class UserController {
        public users;

        constructor(
            private userService: GameSquad.Services.UserService,
            private $state: angular.ui.IStateService,
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
        }

        //get single id
        //private getUserById() {
        //    this.getUserById = this.userService.getUserById(this.userId);
        //}
        
    }
}