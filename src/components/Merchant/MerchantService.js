import BaseService from '../Base/BaseService'

export default class EventService extends BaseService{
  resourceName = '/api/merchants';
  constructor(hostUrl, service){
    super(hostUrl, service);
  }
}
