namespace GameSquad.Services {

    export class MessageService {
        public messageResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.messageResource = this.$resource('/api/message/:id', null, {
                getMsgsByUser: {
                    method: 'GET',
                    url: '/api/message/getMsgsByUser',
                    isArray: false
                }
            });
        }

        public getMsgsByUser() {
            return this.messageResource.getMsgsByUser();
        }

        public getMessageInfo(id) {
            return this.messageResource.get({ id: id });
        }

        //save message
        public sendMessage(messageToSend) {
            return this.messageResource.save(messageToSend).$promise;
        }

        //delete message
        public deleteMessage(id) {
            return this.messageResource.delete({ id: id }).$promise;
        }
    }
    angular.module('GameSquad').service('messageService', MessageService);
}
