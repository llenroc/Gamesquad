namespace GameSquad.Controllers {
    export class UserDashboardController {
        public userId;
       
        constructor(
            private userDashboardService: GameSquad.Services.UserDashboardService,
            private $state: angular.ui.IStateService,
            private accountService: GameSquad.Services.AccountService
         
        ) {
            this.getUserById();
            this.getUserInfo();
        }
      
        //get single id
        private getUserById() {
            this.getUserById = this.userDashboardService.getUserById(this.userId);
        }

        //
        public getUserInfo() {
            return this.userDashboardService.getUserInfo();
        }

        //get user info
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

       
        //get user profile info
        //public getUserBio() {
        //    return this.accountService.getUserBio();
        //}

        //public getUserLocation() {
        //    return this.accountService.getUserLocation();
        //}

        //public getUserPlatform() {
        //    return this.accountService.getUserPlatform();
        //}
        //
    }
}