namespace GameSquad.Controllers {

    export class TeamController {

        public team: any;
        public members;
        public users;
        public teamToCreate;
        public teams;
        public teamId;

        constructor(private teamService: GameSquad.Services.TeamService,
            private $state: angular.ui.IStateService
           
        ) {

            this.teamsByUser();
            this.getTeams();

        }



        public getTeams() {

            this.teamService.getTeams().$promise.then((data) => {
                this.team = data;
                debugger

            });
        }

        //get team info by ID
        public getTeamInfoById(id) {

            this.teamService.getTeamInfo(id)
                .then((data) => {
                    console.log(data);

                }).catch(() => {
                    console.log("something went wrong");
                })

        }

        public saveTeam() {

            this.teamService.saveTeam(this.teamToCreate)
                .then((data) => {
                    this.$state.go('team');
                    console.log(data);

                }).catch(() => {
                    console.log("something went wrong");
                })

        }

        public UserByTeam(members, id) {
            this.members = members;
            this.users = this.teamService.getUsersByTeam(id);
        }

        public teamsByUser() {
            this.teamService.getTeamsByUser().$promise.then((data) => {
                this.teams = data;
                console.log(this.teams);
            });
        }

        //add Member to Team
        public addMemberToTeam(teamId) {
            debugger
            this.teamService.addMemberToTeam(teamId)
           
                //.then(() => {

                //    this.$state.go('team');
                //    //this.$uibModalInstance.close();
                    
                //})
            console.log("joined team");
        }

        //Remove Member
        public removeMember(teamId) {

            this.teamService.removeMember(teamId);
        }



    }



  
    

    angular.module('GameSquad').controller('TeamController', TeamController);
}