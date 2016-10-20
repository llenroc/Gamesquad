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
        
        
       //save team details
        public saveTeam() {

            this.teamDetails = this.teamService.saveTeam(this.teamDetails).then(() => {
                window.history.back();
            });
        }
       

        //delete team modal
        ModalDel() {
            var id = this.$stateParams['id'];
            this.$uibModal.open({

                templateUrl: '/ngapp/views/teamDelete.html',
                controller: 'ModalController',
                controllerAs: 'controller',
                resolve: {
                    id: () => id,
                },
                size: 'md'
            }).closed.then(() => {
                this.$state.go("myTeam"); 
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
            this.teamService.getTeamInfo($stateParams['id']).then((data) => {
                this.teamDetails = data;
            });
            
        }
        
    }
     class ModalController {
        
        constructor(
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private teamService: GameSquad.Services.TeamService,
            private id
        ) {

        }
        //cancel 
        public cancel() {
            this.$uibModalInstance.close();
        }

        //delete team
        public deleteTeam() {
            this.teamService.deleteTeam(this.id).then(() => {
                this.cancel();
            });
        }

    }

    angular.module('GameSquad').controller('ModalController', ModalController);
}
