namespace GameSquad.Services {
    export class UserService {
        private usersResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.usersResource = $resource('/api/user', null, {
                getTableData: {
                    method: 'GET',
                    url: '/api/user/getTableData/:id',
                    isArray: true
                }
            });
        }

        //return all users
        public getAllUsers(id) {
            return this.usersResource.getTableData({ id: id });
        }

        //return a user by id 
        public getUserById(id) {
            return this.usersResource.get({ id: id });
        }
    }
    angular.module('GameSquad').service('userService', UserService);
}