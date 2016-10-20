namespace GameSquad.Services {

    export class TeamService {

        public teamsResource;
        public teamResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.teamsResource = this.$resource('/api/team/:id', null, {
                addMemberToTeam: {
                    method: 'GET',
                    url: '/api/team/addMemberToTeam/:teamId',
                },
                RemoveMember: {
                    method: 'GET',
                    url: '/api/team/RemoveMember/:teamId',
                },
                getTeamsByUser: {
                    method: 'GET',
                    url: '/api/team/getTeamsByUser',
                    isArray: true
                },
                getTableData: {
                    method: 'GET',
                    url: '/api/team/getTableData',
                    isArray: true
                }
            });
            this.teamResource = this.$resource('api/teamSearch/:id');
        }

        public getTeamInfo(id) {
            return this.teamsResource.get({ id: id }).$promise;
        }

        //save
        public saveTeam(teamToSave) {
            return this.teamsResource.save(teamToSave).$promise;
        }

        public getTeamsByUser() {
            return this.teamsResource.getTeamsByUser();
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

        public deleteTeam(id) {
            return this.teamsResource.delete({ id: id }).$promise;
        }
    }
    angular.module('GameSquad').service('teamService', TeamService);
}