import { BaseApi } from './base';

export class IdentityApi extends BaseApi {
  public async getCustomer() {
    const response = await this.identity.identityControllerMe();
    return response.data as unknown as { customerId: string, fullName: string };
  }
}
