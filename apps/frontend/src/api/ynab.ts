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
    const response = await this.ynab.ynabControllerGetAll();
    return response.data.accounts;
  }

  async link(accountId: string, linkRequest: YnabControllerLinkRequest) {
    return this.ynab.ynabControllerLink(accountId, linkRequest);
  }

  async createManyLinks(
    linkRequests: { bankAccountId: string; ynabAccountId: string }[],
  ) {
    return Promise.all(
      linkRequests.map((linkRequest) =>
        this.ynab.ynabControllerLink(linkRequest.ynabAccountId, {
          bankAccountID: linkRequest.bankAccountId,
        }),
      ),
    );
  }
}
