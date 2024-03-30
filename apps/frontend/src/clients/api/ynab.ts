import {
  YnabControllerAuthorizeRequest,
  YnabControllerLinkRequest,
} from './__generated__';
import { BaseApi } from './base';

export class YnabApi extends BaseApi {
  async authorize(data: YnabControllerAuthorizeRequest) {
    return this.ynab.ynabControllerAuthorize(data);
  }

  async getAll() {
    return this.ynab.ynabControllerGetAll();
  }

  async link(accountID: string, linkRequest: YnabControllerLinkRequest) {
    return this.ynab.ynabControllerLink(accountID, linkRequest);
  }
}
