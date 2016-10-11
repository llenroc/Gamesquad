namespace GameSquad.Services {

    export class TeamService {

        public teamsResource;
        public teamResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.teamsResource = this.$resource('/api/team/:id', null, {
                addMemberToTeam: {
                    method: 'POST',
                    url: '/api/team/addMemberToTeam/:teamId',
                },
                RemoveMember: {
                    method: 'POST',
                    url: '/api/team/RemoveMember/:teamId',
                },
                getTableData: {
                    method: 'GET',
                    url: '/api/team/getTableData',
                    isArray: true
                }
            });
            this.teamResource = this.$resource('api/teams/:id');
        }

        public getTeamInfo(id) {
            return this.teamsResource.get({ id: id });
        }

        //save
        public saveTeam(teamToSave) {
            return this.teamsResource.save(teamToSave).$promise;
        }

        public getTeams(_data) {
            return this.teamResource.save(_data).$promise;
        }

        public addMemberToTeam(teamId) {
            return this.teamsResource.addMemberToTeam({ teamId: teamId }).$promise;
        }

        public removeMember(teamId) {
            return this.teamsResource.RemoveMember({ teamId: teamId }).$promise;
        }
    }
    angular.module('GameSquad').service('teamService', TeamService);
}