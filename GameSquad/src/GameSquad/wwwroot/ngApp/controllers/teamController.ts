namespace GameSquad.Controllers {

    export class TeamController {
        public team: any;
        public members;
        public users;
        public teamToCreate;
        public teams;
        public teamId;
        public data = { pageCount: 0, nameFilter: "", typeFilter: "", leaderFilter: "" };
        public teamHolder = [];

        constructor(private accountService: GameSquad.Services.AccountService,private teamService: GameSquad.Services.TeamService, private $state: angular.ui.IStateService) {
            this.getTeams();
            this.teamsByUser();
        }

        public getTeams() {
            this.teamService.getTeams(this.data).then((_data) => {
                this.teamHolder = [];
                var holder = _data.data;
                for (var team of holder) {
                    team.team.isMember = team.isMember;
                    this.teamHolder.push(team.team);
                }
                console.log(holder);
                if (document.getElementById("previous") != null){
                    if (this.data.pageCount == 0) {
                        document.getElementById("previous").style.visibility = "hidden";
                    }
                    else if (this.data.pageCount > 0) {
                        document.getElementById("previous").style.visibility = "visible";
                    }
                }
                if (document.getElementById("next") != null) {
                    if (holder.length < 5) {
                        document.getElementById("next").style.visibility = "hidden";
                    }
                    else if (holder.length == 5) {
                        document.getElementById("next").style.visibility = "visible";
                    }
                }
            });
        }

        public nextPage() {
            this.data.pageCount++;
            this.getTeams();
        }

        public prevPage() {
            this.data.pageCount--;
            this.getTeams();
        }

        //get team info by ID
        public getTeamInfoById(id) {
            this.teamService.getTeamInfo(id);
        }

        public saveTeam() {
            this.teamToCreate.teamLeader = this.accountService.getUserName();
            this.teamService.saveTeam(this.teamToCreate)
                .then((data) => {
                    this.$state.go('myTeam');
                }).catch(() => {
                    console.log("something went wrong");
                })
        }

        public teamsByUser() {
            this.teamService.getTeamsByUser().$promise.then((data) => {
                this.teams = data;
                console.log(this.teams);
            });
        }

        //add Member to Team
        public addMemberToTeam(teamId) {
            this.teamService.addMemberToTeam(teamId)
        }

        //Remove Member
        public removeMember(teamId) {
            this.teamService.removeMember(teamId);
        }
    }

    angular.module('GameSquad').controller('TeamController', TeamController);
}