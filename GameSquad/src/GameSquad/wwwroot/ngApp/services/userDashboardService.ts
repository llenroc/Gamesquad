namespace GameSquad.Services {
    export class UserDashboardService {
        private usersResource;
        
        constructor(private $resource: angular.resource.IResourceService) {
            this.usersResource = this.$resource('/api/user/:id');
        }

        // get user id
        public getUserById(id) {
            var user = this.usersResource.get({ id: id }).$promise;
            return user;
        }
       
        public getUserInfo() {
            return this.usersResource.getUserInfo(); 
        }

        public saveProfile(profileToSave) {
            return this.usersResource.save(profileToSave).$promise;
        }
    }
    angular.module('GameSquad').service('userDashboardService', UserDashboardService);
}