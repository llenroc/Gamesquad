namespace GameSquad.Controllers {

    declare var $;

    export class TeamInfoController {
        public teamDetails;
        public chatHub;
        public messages = [];
        public newMessage;
        
        //check to see if user is team Leader
        public teamOwner() {
            if (this.accountService.getUserName() == this.teamDetails.teamLeader) {
              
                return true;
                
            }
            else {
                return false;
            }
        }
        
        //delete team
        public deleteTeam() {
            this.teamService.deleteTeam(this.teamDetails.id);
        }
       //save team details
        public saveTeam() {

            this.teamDetails = this.teamService.saveTeam(this.teamDetails);
        }
        //cancel 
        public cancel() {
            //this.$uibModalInstance.close();
        }

        //delete team modal
        showModalDelPost() {
            
            this.$uibModal.open({

                templateUrl: '/ngapp/views/teamDelete.html',
                controller: 'TeamInfoController',
                controllerAs: 'controller',
              
                size: 'md'
            }).closed.then(() => {
                this.$state.reload(); 
            });
        }

      
        constructor(
            private teamService: GameSquad.Services.TeamService,
            private userService: GameSquad.Services.UserService,
            private $stateParams: ng.ui.IStateParamsService,
            private $scope: ng.IScope,
            private accountService: GameSquad.Services.AccountService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private $state: angular.ui.IStateService
            //private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance
        ) {
            this.teamDetails = this.teamService.getTeamInfo($stateParams['id']);
            
        }
    }
}
