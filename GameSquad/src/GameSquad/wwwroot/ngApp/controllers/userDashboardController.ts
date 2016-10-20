namespace GameSquad.Controllers {
    export class UserDashboardController {
        public userId;
        public user;
        public file;
        constructor(private userDashboardService: GameSquad.Services.UserDashboardService, private $state: angular.ui.IStateService, private accountService: GameSquad.Services.AccountService, private filepickerService, private $scope: ng.IScope) {
            this.getUserById();
        }

        //get single id
        private getUserById() {
            this.userDashboardService.getUserById(this.isLoggedIn()).then((data) => {
                this.user = data;
            });
        }

        //
        //public getUserInfo() {
        //    this.userDashboardService.getUserInfo().$promise.then((data) => {
        //        this.user = data;
        //    });
        //}

        public saveProfile() {
            if (this.user.profileImage == null) {
                this.user.profileImage = "/images/defaultUser.png";
            }
            this.userDashboardService.saveProfile(this.user)
                .then((data) => {
                    //document.location.reload();
                    this.$state.go('home');
                }).catch(() => {
                    console.log("something went wrong");
                })
        }

        public pickFile() {
            this.filepickerService.pick(
                { mimetype: 'image/*' },
                this.fileUploaded.bind(this)
            );
        }

        public fileUploaded(file) {
            this.file = file;
            this.user.profileImage = this.file.url;
            this.$scope.$apply(); // force page to update
        }

        public cancel() {
            this.$state.go('home');
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
    }
    angular.module('GameSquad').controller('UserDashboardController', UserDashboardController);
}