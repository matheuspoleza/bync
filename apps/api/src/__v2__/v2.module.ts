import { Module } from '@nestjs/common';
import { BankingModule } from './banking/banking.module';
import { BelvoModule } from './belvo/belvo.module';
import { CommonModule } from './common/common.module';
import { IdentityModule } from './identity/identity.module';
import { SyncModule } from './sync/sync.module';
import { YnabModule } from './ynab/ynab.module';

@Module({
  imports: [
    BankingModule,
    BelvoModule,
    CommonModule,
    IdentityModule,
    SyncModule,
    YnabModule,
  ],
})
export class V2Module {}
