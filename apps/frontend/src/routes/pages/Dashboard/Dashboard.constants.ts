import { z } from 'nestjs-zod/z';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

export const accountTypes = [
  {
    value: 'checking',
    label: 'Conta corrente',
    icon: AccountBalanceWalletOutlinedIcon,
  },
  {
    value: 'creditCard',
    label: 'Cartão de Crédito',
    icon: CreditCardOutlinedIcon,
  },
  {
    value: 'otherAsset',
    label: 'Investimentos',
    icon: SavingsOutlinedIcon,
  },
  {
    value: 'mortgage',
    label: 'Financiamento de imóvel',
    icon: HomeOutlinedIcon,
  },
  {
    value: 'autoLoan',
    label: 'Financiamento de carro',
    icon: TimeToLeaveOutlinedIcon,
  },
];
