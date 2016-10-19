namespace GameSquad.Services {
    export class StatusService {
        private statusResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.statusResource = $resource("/api/status/:id");
        }

        public saveStatus(status) {
            
            return this.statusResource.save(status).$promise;
        }
    }

    angular.module('GameSquad').service('statusService', StatusService);
}