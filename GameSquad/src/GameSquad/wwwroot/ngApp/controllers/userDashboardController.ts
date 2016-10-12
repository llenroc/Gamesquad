namespace GameSquad.Controllers {
    export class UserDashboardController {
        public userId;
        public user;
        public profileToSave;
        public file;
        constructor(private userDashboardService: GameSquad.Services.UserDashboardService, private $state: angular.ui.IStateService, private accountService: GameSquad.Services.AccountService, private filepickerService, private $scope: ng.IScope) {
            this.getUserById();
        }

        //get single id
        private getUserById() {
            this.user = this.userDashboardService.getUserById(this.isLoggedIn());
        }

        //
        public getUserInfo() {
            this.userDashboardService.getUserInfo().$promise.then((data) => {
                this.user = data;
            });
        }

        public saveProfile() {
            this.userDashboardService.saveProfile(this.profileToSave)
                .then((data) => {
                    document.location.reload();
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
            // save file url to database
            this.file = file;
            console.log(this.file);
            console.log(this);
            this.profileToSave["profileImage"] = this.file.url;
            console.log(this.profileToSave);
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