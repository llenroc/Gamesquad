namespace GameSquad.Controllers {

    export class PostController {

        public posts;
        private postId;

        constructor(private PostService: GameSquad.Services.PostService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private accountService: GameSquad.Services.AccountService,
            private $stateParams: angular.ui.IStateParamsService) {
            this.getPosts();
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public getPosts() {
            this.PostService.getPosts().then((data) => {
                this.posts = data;
            });
        }

        public getPostById() {
            this.posts = this.PostService.getPostById(this.postId);
        }

        public getUserName() {
            return this.accountService.getUserName();
        }

        //controller for delete posts modal
        showModalDelPost(postId) {
            this.$uibModal.open({

                templateUrl: '/ngapp/views/postDelete.html',
                controller: 'DialogController',
                controllerAs: 'controller',
                resolve: {
                    postId: () => postId,
                },
                size: 'lg'
            }).closed.then(() => {
                this.getPosts();
            });
        }

        //controller for edit
        showModalEditPost(postId) {
            this.$uibModal.open({
                templateUrl: '/ngapp/views/postEdit.html',
                controller: 'EditDialogController',
                controllerAs: 'controller',
                resolve: {
                    postId: () => postId,
                },
                size: 'lg'
            }).closed.then(() => {
                this.getPosts();
            });
        }
    }

    class DialogController {
        public posts;
        public postToSave = {};
        public errorMessages;
        public postToDelete;

        constructor(private PostService: GameSquad.Services.PostService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: angular.ui.IStateService,
            private $stateParams: angular.ui.IStateParamsService,
            private $location: ng.ILocationService, private postId,
            private accountService: GameSquad.Services.AccountService) {

        }
        
        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        //delete 
        private getPostById() {
            this.postToDelete = this.PostService.getPostById(this.postId);
        }

        public deletePost() {
            this.PostService.deletePost(this.postId)
                .then(() => {
                    this.$state.reload();
                    this.$uibModalInstance.close();
                    
                    
                })


        }

        //cancel delete - exit modal<html>
        public cancel() {
            this.$uibModalInstance.close();
        }
    }

    //edit dialog
    class EditDialogController {
        public postToEdit;

        constructor(private $stateParams: angular.ui.IStateParamsService,
            private PostService: GameSquad.Services.PostService,
            private $state: angular.ui.IStateService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private postId,
            private accountService: GameSquad.Services.AccountService) {
            this.getPostById();
        }
        
        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        //cancel - exit modal<html>
        public cancel() {
            this.$uibModalInstance.close();
        }

        private getPostById() {
            console.log("test");
            this.postToEdit = this.PostService.getPostById(this.postId);
            
        }

        public savePost() {
            this.PostService.savePost(this.postToEdit)
                .then(() => {
                    this.$state.reload();
                    this.$uibModalInstance.close();
                })
                .catch(() => {
                    console.log('Oops! Post Editor not working right now....');
                });
        }
    }

    angular.module('GameSquad').controller('PostController', PostController);
    angular.module('GameSquad').controller('DialogController', DialogController);
    angular.module('GameSquad').controller('EditDialogController', EditDialogController);
}