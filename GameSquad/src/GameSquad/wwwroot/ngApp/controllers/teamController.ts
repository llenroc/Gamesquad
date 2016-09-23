namespace GameSquad.Controllers {

    export class TeamController {

        public team;
        public members;
        public users;
        public teamToCreate;
        public teams;

        constructor(private teamService: GameSquad.Services.TeamService,
            private $state: angular.ui.IStateService) {

            this.teamsByUser();
            this.getTeams();

        }

        

        public getTeams() {

            this.team = this.teamService.getTeams();
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

        public addMemberToTeam(teamId) {
            this.teamService.addMemberToTeam(teamId);

        }
    }



}