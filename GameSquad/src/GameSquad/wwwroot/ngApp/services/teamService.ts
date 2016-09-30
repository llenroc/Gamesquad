namespace GameSquad.Services {

    export class TeamService {

        public teamsResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.teamsResource = this.$resource('/api/team/:id', null, {
                getUsersByTeam: {
                    method: 'GET',
                    url: '/api/team/getUsersByTeam/:id',
                    isArray: true
                },
                getTeamsByUser: {
                    method: 'GET',
                    url: '/api/team/getTeamsByUser',
                    isArray: true
                },
                addMemberToTeam: {
                    method: 'GET',
                    url: '/api/team/addMemberToTeam/:teamId',
                    
                },              
                RemoveMember: {
                    method: 'GET',
                    url: '/api/team/RemoveMember/:teamId',

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

        public getUsersByTeam(id) {
            return this.teamsResource.getUsersByTeam({ id: id });
        }

        public getTeamsByUser() {
            return this.teamsResource.getTeamsByUser();
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