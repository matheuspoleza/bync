import { atomWithStorage } from 'jotai/utils';
import { STORAGE_KEYS } from './utils';

const CUSTOMER_ID = 'b66f3403-befb-46ab-9dc1-08c1105dac06';

export const activeCustomerID = atomWithStorage(
  STORAGE_KEYS.CUSTOMER_ID,
  CUSTOMER_ID
);
