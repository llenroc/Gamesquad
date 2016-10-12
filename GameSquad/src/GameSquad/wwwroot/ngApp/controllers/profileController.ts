namespace GameSquad.Controllers {
    export class ProfileController {

        public user;

        constructor(private userDashboardService: GameSquad.Services.UserDashboardService, private $stateParams: ng.ui.IStateParamsService, private $state: angular.ui.IStateService, private accountService: GameSquad.Services.AccountService, private filepickerService, private $scope: ng.IScope) {
            this.getUserById();
        }

        //get used info by id
        private getUserById() {
            this.userDashboardService.getUserById(this.$stateParams['id']).then((data) => {
                this.user = data;
                console.log(this.user);
                console.log("here");
            }).catch(() => {
                console.log("broken");
                });
            
        }
    }
    angular.module('GameSquad').controller('ProfileController', ProfileController);
}