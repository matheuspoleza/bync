import {
  YnabControllerAuthorizeRequest,
  YnabControllerGetAll200Response,
  YnabControllerLinkRequest,
} from './__generated__';
import { BaseApi } from './base';

export class YnabApi extends BaseApi {
  async authorize(data: YnabControllerAuthorizeRequest) {
    return this.ynab.ynabControllerAuthorize(data);
  }

  async getAll() {
    const response = await this.ynab.ynabControllerGetAll();
    return (
      response.data.accounts ??
      ([] as YnabControllerGetAll200Response['accounts'])
    );
  }

  async link(accountId: string, linkRequest: YnabControllerLinkRequest) {
    return this.ynab.ynabControllerLink(accountId, linkRequest);
  }
}
