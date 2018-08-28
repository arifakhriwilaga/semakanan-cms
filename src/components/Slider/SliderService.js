import BaseService from '../Base/BaseService'

export default class SliderService extends BaseService{
  resourceName = '/api/sliders';
  constructor(hostUrl, service){
    super(hostUrl, service);
  }
}
