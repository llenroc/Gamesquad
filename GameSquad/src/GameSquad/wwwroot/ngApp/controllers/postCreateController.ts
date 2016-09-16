namespace GameSquad.Controllers {
    export class PostCreateController {
        public postToSave = {};
        public errorMessages;
        public file;
        public logged;

        constructor(
            private PostService: GameSquad.Services.PostService,
            private $state: angular.ui.IStateService,
            private filepickerService, private $scope: ng.IScope,
            private accountService: GameSquad.Services.AccountService
        ) {
            this.logged = this.isLoggedIn();
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public savePost() {
            this.PostService.savePost(this.postToSave).then(() => {
                this.$state.go('home');
                console.log("infoSaved");
               
            });
            if (!this.logged) {

                console.log('need to sign in');
            }

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
            this.postToSave["item"] = this.file.url;
            console.log(this.postToSave);
            this.$scope.$apply(); // force page to update
        }

    }

    angular.module("GameSquad").controller('postCreateController', PostCreateController);
}