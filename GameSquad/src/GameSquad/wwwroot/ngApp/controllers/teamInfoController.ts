namespace GameSquad.Controllers {

    export class TeamInfoController {

        public teamDetails;

        constructor(private teamService: GameSquad.Services.TeamService, private userService: GameSquad.Services.UserService, $stateParams: ng.ui.IStateParamsService) {
            this.teamDetails = this.teamService.getTeamInfo($stateParams['id']);
        }

    }

}
