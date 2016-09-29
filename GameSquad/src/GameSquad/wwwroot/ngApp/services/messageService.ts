namespace GameSquad.Services {

    export class MessageService {
        public messageResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.messageResource = this.$resource('/api/message/:id', null, {
                getMsgsByUser: {
                    method: 'GET',
                    url: '/api/message/getMsgsByUser',
                    isArray: true
                }
            });
        }
        public getMsgsByUser() {
            return this.messageResource.getMsgsByUser();
        }
        public getMessageInfo(id) {


            return this.messageResource.get({ id: id });
        }
    }
    angular.module('GameSquad').service('messageService', MessageService);
}
