import { useEffect, useState } from 'react';
import { modalsManager } from '../../context/modal';
import { OnboardingBankAccountsStep } from './Steps/BankAccounts.component';
import { OnboardingConnectionStep } from './Steps/Connection.component';
import { OnboardingYNABAccountsStep } from './Steps/YNABAccounts.component';

interface ModalProps {
  step: string;
}

export const OnboardingModal = modalsManager.register<ModalProps>(
  'OnboardingModal',
  ({ step, closeModal }) => {
    const [activeStep, setStep] = useState<string>('bank-accounts');

    useEffect(() => setStep(step), [step]);

    return (
      <>
        {activeStep === 'connection' && (
          <OnboardingConnectionStep onClose={closeModal} />
        )}
        {activeStep === 'bank-accounts' && (
          <OnboardingBankAccountsStep onNext={() => setStep('budgets')} />
        )}
        {activeStep === 'budgets' && <OnboardingYNABAccountsStep />}
      </>
    );
  }
);
