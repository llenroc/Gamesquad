namespace GameSquad.Controllers {
    export class UserDashboardController {
        public userId;
        public posts;
        constructor(
            private userDashboardService: GameSquad.Services.UserDashboardService,
            private $state: angular.ui.IStateService,
            private accountService: GameSquad.Services.AccountService,
            private PostService: GameSquad.Services.PostService
        ) {
            this.getUserById();
            this.getPosts();
        }
      
        //get single id
        private getUserById() {
            this.getUserById = this.userDashboardService.getUserById(this.userId);
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

        public getPosts() {
            this.posts = this.PostService.getPosts();
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