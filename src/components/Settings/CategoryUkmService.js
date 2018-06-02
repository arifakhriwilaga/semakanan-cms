import BaseService from '../Base/BaseService'

export default class CategoryUkmService extends BaseService{
  resourceName = 'api/category';
  constructor(hostUrl, service){
    super(hostUrl, service);
  }
}