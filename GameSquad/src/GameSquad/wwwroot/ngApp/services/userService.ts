namespace GameSquad.Services {
    export class UserService {
        private usersResource;
        private userSearchResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.usersResource = $resource('/api/user');
            this.userSearchResource = $resource('/api/userSearch');
        }

        //return all users
        public getAllUsers(_data) {
            return this.userSearchResource.save(_data).$promise;
        }

        //return a user by id 
        public getUserById(id) {
            return this.usersResource.get({ id: id }).$promise;
        }
    }
    angular.module('GameSquad').service('userService', UserService);
}