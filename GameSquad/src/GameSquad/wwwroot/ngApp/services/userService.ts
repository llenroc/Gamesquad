namespace GameSquad.Services {
    export class UserService {
        private usersResource;
        constructor(private $resource: angular.resource.IResourceService) {
            this.usersResource = $resource('/api/user');
        }
        //return all users
        public getAllUsers() {
            return this.usersResource.query();
        }
        //return a user by id 
        public getUserById(id) {
            return this.usersResource.get({ id: id });
        }

        //Edit TeamID
        public EditTeamId(userId, teamId) {

        }
    }
    angular.module('GameSquad').service('userService', UserService);
}