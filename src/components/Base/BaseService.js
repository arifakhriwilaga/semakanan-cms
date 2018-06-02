import axios from 'axios';


export default class BaseService {
  resourceName = '';
  result = '';
  errors = [];

  constructor(hostUrl = process.env.HOST_URL, service = axios) {
    let config = {
      headers: {
        'Content-Type': 'Application/Json',
        'Accept': 'Application/Json'
      }
    }
    this.service = service;
    this.service.defaults.headers = config.headers;
    this.service.defaults.baseURL = hostUrl;
  }

  query(queryParams) {
    return this.service.get(
      this.resourceName,
      queryParams,
      {headers:{'Accept': 'Application/Json'}})
  }

  post(body) {
    return this.service.post(this.resourceName, body)
  }

  put(id, body) {
    return this.service.put(this.resourceName + '/' + id, body)
  }

  delete(id){
    return this.service.delete(this.resourceName + '/' + id)
  }

}
