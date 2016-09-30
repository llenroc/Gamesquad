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

        //save message
        public saveMessage(messageToSave) {

            return this.messageResource.save(messageToSave).$promise;

        }
        //delete message

        public deleteMessage(id) {

            return this.messageResource.delete({ id: id }).$promise;
        }

    }
    angular.module('GameSquad').service('messageService', MessageService);
}
