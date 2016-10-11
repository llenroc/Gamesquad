namespace GameSquad.Services {

    export class FriendService {
        private friendsResource;
        constructor(private $resource: angular.resource.IResourceService) {
            this.friendsResource = this.$resource('/api/friend/:id');
        }

        public getFriends() {
            return this.friendsResource.query();
        }

        public getFriendsById(id) {
            return this.friendsResource.get({ id: id });
        }

        public getFriendsByUser() {
            return this.friendsResource.getFriendsByUser();
        }

        public addFriendToUser(friendId) {
            var _data = { friendId: friendId };
            return this.friendsResource.save(_data).$promise;
        }

        public removeFriend(id) {
            return this.friendsResource.delete({ id: id }).$promise;
        }
    }
    angular.module('GameSquad').service('FriendService', FriendService);
}