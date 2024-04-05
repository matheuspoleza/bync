import { Controller, Post } from '@nestjs/common';
import { SyncService } from './sync.service';
import { ApiTags } from '@nestjs/swagger';
import { CustomerId } from '../common';

@Controller('sync')
@ApiTags('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('manual')
  async manualSync(@CustomerId() customerId: string) {
    this.syncService.manualSync(customerId);
  }
}
