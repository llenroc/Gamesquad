namespace GameSquad.Services {

    export class FriendRequestService {
        private friendRequestResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.friendRequestResource = this.$resource('/api/friendrequest/:id');
        }

        public sendFriendRequest(user) {
            return this.friendRequestResource.save(user).$promise;
        }

        public removeFriendRequest(id) {
            return this.friendRequestResource.delete({ id: id }).$promise;
        }

        public getFriendRequests() {
            return this.friendRequestResource.query();
        }
    }
    angular.module('GameSquad').service('friendRequestService', FriendRequestService);
}