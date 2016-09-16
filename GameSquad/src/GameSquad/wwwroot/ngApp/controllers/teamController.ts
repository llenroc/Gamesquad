namespace GameSquad.Controllers {

    export class TeamController {

        public team;
        public myteam;
        public users;
        public teamToCreate;
        constructor(private teamService: GameSquad.Services.TeamService,
            , private $state: angular.ui.IStateService) {

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

        public members(myteam, id) {
            this.myteam = myteam;
            this.users = this.teamService.getUsersForTeam(id);
        }
    }



}