namespace GameSquad.Controllers {
    export class PostCreateController {
        public postToSave = {};
        public errorMessages;
        public file;
        public logged;

        constructor( private PostService: GameSquad.Services.PostService, private $state: angular.ui.IStateService, private filepickerService, private $scope: ng.IScope, private accountService: GameSquad.Services.AccountService) {
            this.logged = this.isLoggedIn();
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public savePost() {
            this.PostService.savePost(this.postToSave).then(() => {
                this.$state.go('updates');
            });
            if (!this.logged) {

            }
        }

        public pickFile() {
            this.filepickerService.pick(
                {
                    mimetype: 'image/*',
                    imageQuality: 60
                },
                this.fileUploaded.bind(this)
            );
        }

        public goBack() {
            window.history.back();
            console.log("back one page?");
        }

        public fileUploaded(file) {
            // save file url to database
            this.file = file;
            console.log(this.file);
            console.log(this);
            this.postToSave["item"] = this.file.url;
            console.log(this.postToSave);
            this.$scope.$apply(); // force page to update
        }
    }

    angular.module("GameSquad").controller('postCreateController', PostCreateController);
}