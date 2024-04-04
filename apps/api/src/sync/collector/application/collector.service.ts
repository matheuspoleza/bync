import { Inject, Injectable } from '@nestjs/common';
import { IBankingFacade } from '../domain/banking';
import { Process, Processor } from '@nestjs/bull';
import { QUEUE_NAMES } from 'src/app.constants';
import { Job } from 'bull';
import { CollectDto } from './dtos/collect.dto';

@Injectable()
@Processor(QUEUE_NAMES.SYNC_COLLECTOR)
export class CollectorService {
  constructor(@Inject(IBankingFacade) private bankingFacade: IBankingFacade) {}

  @Process()
  async collect(job: Job<CollectDto>) {
    const linkedBankAccounts = await this.bankingFacade.getAllLinkedAccounts();
  }
}
