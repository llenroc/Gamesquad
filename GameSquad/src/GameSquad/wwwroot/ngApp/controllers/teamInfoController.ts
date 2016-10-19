namespace GameSquad.Controllers {

    declare var $;

    export class TeamInfoController {
        public teamDetails;
        public chatHub;
        public messages = [];
        public newMessage;



        public teamOwner() {
            if (this.accountService.getUserName == this.teamDetails.teamLeader) {
                return true;
            }
            else {
                return false;
            }
        }

        public deleteTeam() {

        }

        constructor(
            private teamService: GameSquad.Services.TeamService,
            private userService: GameSquad.Services.UserService,
            $stateParams: ng.ui.IStateParamsService,
            private $scope: ng.IScope,
            private accountService: GameSquad.Services.AccountService
        ) {
            this.teamDetails = this.teamService.getTeamInfo($stateParams['id']);
            
        }
    }
}
