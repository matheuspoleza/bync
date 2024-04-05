import { BaseApi } from './base';

export class SyncApi extends BaseApi {
  async manualSync() {
    await this.sync.syncControllerManualSync();
  }
}
