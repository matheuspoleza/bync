import {
  BelvoAccountBalanceType,
  BelvoAccountInstitutionType,
  BelvoAccountCategory,
} from '../../infrastructure/belvo.gateway';

export interface BelvoAccountDto {
  id: string;
  link: string;
  name: string;
  number: string;
  institutionName: string;
  instutionType: BelvoAccountInstitutionType;
  category: BelvoAccountCategory;
  type: string;
  subtype: string;
  currentBalance: number;
  balanceType: BelvoAccountBalanceType;
}
