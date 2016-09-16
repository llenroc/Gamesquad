namespace GameSquad.Services {
    export class UserDashboardService {
        private usersResource;
        private postResource;
        constructor(private $resource: angular.resource.IResourceService) {
            this.usersResource = $resource('/api/user/:id');
            this.postResource = this.$resource('/api/post/:id');
        }
        // get user id
        public getUserById(id) {;
            return this.usersResource.get({ id: id });
       
        }
        public getPosts() {
            return this.postResource.query();
        }
      
    }
    angular.module('GameSquad').service('userDashboardService', UserDashboardService);
}