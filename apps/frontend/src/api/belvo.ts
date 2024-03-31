import { BaseApi } from './base';

export class BelvoApi extends BaseApi {
  async createSession() {
    return this.belvo.belvoControllerCreateSession();
  }
}
