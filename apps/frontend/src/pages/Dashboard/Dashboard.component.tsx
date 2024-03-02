import { Box, Grid, MenuItem, Select } from '@mui/material';
import { useBankingAccounts } from '../../hooks/banking';
import { useBudgetAccounts } from '../../hooks/budgets';
import { useConnectionsForm } from './Dashboard.hook';
import PendingIcon from '@mui/icons-material/PendingOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

export const DashboardPage = () => {
  const budgetAccounts = useBudgetAccounts();
  const bankingAccounts = useBankingAccounts();
  const {
    connections,
    bankAccountsMap,
    budgetAccountsMap,
    connectedBankAccountIDs,
    connectedBudgetAccountIDs,
    onBankAccountSelect,
    onBudgetAccountSelect,
  } = useConnectionsForm({
    bankAccounts: bankingAccounts.accounts,
    budgetAccounts: budgetAccounts.accounts,
  });

  return (
    <Grid item>
      <Box>{/* // add logo here */}</Box>

      <Box>
        {Object.entries(connections).map(([id, connection]) => (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            minWidth="500px"
            width="100%"
            key={id}
          >
            <Box minWidth="150px">
              <Select
                labelId="banking-accounts-select-label"
                id="banking-accounts-select"
                value={bankAccountsMap[connection.bankAccountID]}
                label="Conta do Banco"
                onChange={(event) =>
                  onBankAccountSelect(id, event.target.value.toString())
                }
                fullWidth
              >
                {bankingAccounts.accounts
                  .filter(
                    (a) =>
                      !connectedBankAccountIDs.includes(a.id) ||
                      connection.bankAccountID === a.id
                  )
                  .map((bankAccount) => (
                    <MenuItem key={bankAccount.id} value={bankAccount.id}>
                      {bankAccount.name}{' '}
                      {!bankAccount.number.includes('None') &&
                        bankAccount.number}
                    </MenuItem>
                  ))}
              </Select>
            </Box>

            <Box>
              {connection.bankAccountID && connection.budgetAccountID ? (
                <AutorenewOutlinedIcon
                  sx={{
                    animation: 'spin 2s linear infinite',
                    '@keyframes spin': {
                      '0%': {
                        transform: 'rotate(360deg)',
                      },
                      '100%': {
                        transform: 'rotate(0deg)',
                      },
                    },
                  }}
                />
              ) : (
                <PendingIcon />
              )}
            </Box>

            <Box minWidth="150px">
              <Select
                labelId="ynab-accounts-select-label"
                id="ynab-accounts-select"
                value={budgetAccountsMap[connection.budgetAccountID]}
                label="Conta do YNAB"
                onChange={(event) =>
                  onBudgetAccountSelect(id, event.target.value.toString())
                }
                fullWidth
              >
                {budgetAccounts.accounts
                  .filter(
                    (a) =>
                      !connectedBudgetAccountIDs.includes(a.id) ||
                      connection.budgetAccountID === a.id
                  )
                  .map((budgetAccount) => (
                    <MenuItem key={budgetAccount.id} value={budgetAccount.id}>
                      {budgetAccount.name}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
          </Box>
        ))}
      </Box>
    </Grid>
  );
};
