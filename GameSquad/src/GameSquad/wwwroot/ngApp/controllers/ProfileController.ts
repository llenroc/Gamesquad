namespace GameSquad.Controllers {
    export class ProfileController {

        public getUserName() {
            return this.accountService.getUserName();
        }

        public getClaim(type) {
            return this.accountService.getClaim(type);
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public logout() {
            this.accountService.logout();
        }

        constructor(private $uibModal: angular.ui.bootstrap.IModalService, private accountService: GameSquad.Services.AccountService) {

        }
    }
    angular.module('GameSquad').controller('ProfileController', ProfileController);
}