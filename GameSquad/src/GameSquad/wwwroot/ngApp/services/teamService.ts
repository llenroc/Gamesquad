namespace GameSquad.Services {

    export class TeamService {

        public teamsResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.teamsResource = this.$resource('/api/team/:id', null, {
                getUsersByEvent: {
                    method: 'GET',
                    url: '/api/events/getUsersByEvent/:id',
                    isArray: true
                }
            });

        }


        public getTeamInfo(id) {


            return this.teamsResource.get({ id: id });
        }

        //save
        public saveTeam(teamToSave) {

            return this.teamsResource.save(teamToSave).$promise;
        }

        public getTeams() {

            return this.teamsResource.query();
        }

        public getUsersForTeam(id) {
            return this.teamsResource.getUsersByTeam({ id: id });
        }

    }

    angular.module('GameSquad').service('teamService', TeamService);

}