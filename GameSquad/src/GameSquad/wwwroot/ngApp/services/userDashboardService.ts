namespace GameSquad.Services {
    export class UserDashboardService {
        private usersResource;
        
        constructor(private $resource: angular.resource.IResourceService) {
            this.usersResource = this.$resource('/api/user/:id');
        }

        public getUser() {
            var id = "a";
            return this.usersResource.get({ id: id });
        }

        // get user id
        public getUserById(id) {
            return this.usersResource.get({ id: id });
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