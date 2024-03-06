import { Body, Controller, Param, Post } from '@nestjs/common';
import { CollectService } from 'src/application/collect.service';
import { PublishService } from 'src/application/publish.service';

class SyncCollectRequestDTO {
  startDate: string;
  endDate: string;
  userIDs: string[];
}

@Controller('sync')
export class SyncController {
  constructor(
    private readonly collectorService: CollectService,
    private readonly publishService: PublishService,
  ) {}

  @Post('collect')
  async syncCollect(@Body() collectRequestDTO: SyncCollectRequestDTO) {
    return this.collectorService.collectTransactions(
      collectRequestDTO.startDate,
      collectRequestDTO.endDate,
    );
  }

  @Post('publish/:sessionID')
  async syncPublish(@Param('sessionID') sessionID: string) {
    return this.publishService.publishSession(sessionID);
  }
}
