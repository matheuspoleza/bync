import { Controller, Post } from '@nestjs/common';

@Controller('sync')
export class SyncController {
  constructor() {}

  @Post('manual')
  async manualSync() {
    // Call the sync service to start a manual sync
  }
}
