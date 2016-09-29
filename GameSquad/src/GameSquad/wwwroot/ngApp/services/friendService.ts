namespace GameSquad.Services {

    export class FriendService {

        private friendsResource;


        constructor(private $resource: angular.resource.IResourceService) {
            this.friendsResource = this.$resource('/api/Friend/:id');
        }

        
        public getFriends() {
            return this.friendsResource.query();
        }
        public getPostById(id) {
            return this.friendsResource.get({ id: id });
        }
       
    }
    angular.module('GameSquad').service('FriendService', FriendService);
}