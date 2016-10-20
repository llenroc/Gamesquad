namespace GameSquad.Services {

    export class PostService {
        private postResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.postResource = this.$resource('/api/post/:id');
        }

        //create
        public savePost(postToSave) {
            return this.postResource.save(postToSave).$promise;
        }

        //read
        public getPosts() {
            return this.postResource.query().$promise;
        }

        public getPostById(id) {
            return this.postResource.get({ id: id });
        }

        //delete
        public deletePost(id) {
            return this.postResource.delete({ id: id }).$promise;
        }
    }
    angular.module('GameSquad').service('PostService', PostService);
}