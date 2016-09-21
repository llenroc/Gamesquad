namespace GameSquad.Controllers {

    export class TeamInfoController {

        public teamDetails;
        public teamUsers

        constructor(private teamService: GameSquad.Services.TeamService,
            private userService: GameSquad.Services.UserService,
            $stateParams: ng.ui.IStateParamsService) {
            this.teamDetails = this.teamService.getTeamInfo($stateParams['id']);
            this.teamUsers = this.userService.getUserById($stateParams['id']);
        }

    }

}
