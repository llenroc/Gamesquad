namespace GameSquad.Services {

    export class FriendRequestService {
        private friendRequestResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.friendRequestResource = this.$resource('/api/friendrequest/:id');
        }

        public sendFriendRequest(user) {
            console.log('Test ' + user);
            return this.friendRequestResource.save(user).$promise;
        }

    }

    angular.module('GameSquad').service('friendRequestService', FriendRequestService);
}