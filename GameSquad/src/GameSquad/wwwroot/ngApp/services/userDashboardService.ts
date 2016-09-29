namespace GameSquad.Services {
    export class UserDashboardService {
        private usersResource;
        
        constructor(private $resource: angular.resource.IResourceService) {
            this.usersResource = this.$resource('/api/profile/:id');
        
        }
        // get user id
        public getUserById(id) {;
            return this.usersResource.get({ id: id });
       
        }
       
        public getUserInfo() {
            return this.usersResource.query().$promise; 
        }

      
    }
    angular.module('GameSquad').service('userDashboardService', UserDashboardService);
}