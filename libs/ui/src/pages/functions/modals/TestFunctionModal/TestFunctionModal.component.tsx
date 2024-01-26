/* eslint-disable jsx-a11y/no-autofocus */
import React, { useCallback, useEffect, useState } from 'react';

import { TextField } from '@/components/Form/TextField';
import { Modal } from '@/components/Modal';
import { Variable } from '@/components/Other/VariableEntity';
import { Box } from '@/components/Utility/Box';
import { useMockImport } from '@/pages/hooks/useMockImport';

import { ResolvedPathModal } from './ResolvedPathModal/ResolvedPathModal.component';

export interface ITestFunctionModal {
  secondarySection?: (isDisabled: boolean) => React.ReactNode;
}

export const TestFunctionModal: React.FC<ITestFunctionModal> = ({ secondarySection }) => {
  const [variable1, setVariable1] = useState<string>('');
  const [variable2, setVariable2] = useState<string>('');
  const [variable1Error, setVariable1Error] = useState<boolean>(false);
  const [variable2Error, setVariable2Error] = useState<boolean>(false);
  const [hasBeenExecuted, setHasBeenExecuted] = useState<boolean>(false);

  // it's easier to parse state object hence this mock. Should be replaced with real window.localStorage
  const [mockLocalStorage, setMockLocalStorage] = useState<Record<string, string>>({});

  const { isUploading, onImport } = useMockImport(() => {
    setHasBeenExecuted(true);
    setIsSecondModalShown(true);

    setMockLocalStorage({ User_name: variable1, Account_ID: variable2 });
  });
  const [isSecondModalShown, setIsSecondModalShown] = useState<boolean>(false);

  useEffect(() => {
    setVariable1('');
    setVariable2('');
  }, [mockLocalStorage]);

  const handleExecute = (validation = true) => {
    if (validation && !variable1) {
      setVariable1Error(true);
    }
    if (validation && !variable2) {
      setVariable2Error(true);
    }
    if (!validation || (variable1 && variable2)) {
      onImport();
    }
    return null;
  };

  const onVariableFieldFocus = () => {
    setVariable1Error(false);
    setVariable2Error(false);
  };

  const onSecondaryButtonClick = useCallback(() => {
    if (hasBeenExecuted) {
      setVariable1(mockLocalStorage.User_name);
      setVariable2(mockLocalStorage.Account_ID);
    }
  }, [hasBeenExecuted]);

  return (
    <>
      <Modal.Container width="400px">
        <Modal.Header title="Test function" onClose={() => null} />
        <Box id="paddings" gap={16} direction="column" px={24} pt={20} pb={24}>
          <Box direction="column" gap={6}>
            <Variable label="User_name" size="large" />
            <Box direction="column">
              <TextField
                autoFocus
                onFocus={onVariableFieldFocus}
                error={variable1Error}
                errorMessage={variable1Error ? 'Input variable value is required.' : ''}
                value={variable1}
                disabled={isUploading}
                onValueChange={setVariable1}
                placeholder="Enter input variable value"
              />
            </Box>
          </Box>
          <Box direction="column" gap={6}>
            <Variable label="Account_ID" size="large" />
            <Box direction="column">
              <TextField
                error={variable2Error}
                errorMessage={variable2Error ? 'Input variable value is required.' : ''}
                disabled={isUploading}
                onFocus={onVariableFieldFocus}
                value={variable2}
                onValueChange={setVariable2}
                placeholder="Enter input variable value"
              />
            </Box>
          </Box>
        </Box>
        <Modal.Footer>
          <Modal.Footer.Button
            label={hasBeenExecuted ? 'Re-use last value(s)' : 'Cancel'}
            onClick={onSecondaryButtonClick}
            variant="secondary"
            disabled={isUploading}
          />
          <Modal.Footer.Button
            label="Execute"
            disabled={isUploading}
            isLoading={isUploading}
            onClick={() => handleExecute(true)}
            variant="primary"
          />
        </Modal.Footer>
      </Modal.Container>
      {/* do not move the following line to actual codebase. Here for demo purposes */}
      {isSecondModalShown && secondarySection ? secondarySection(isUploading) : null}
      {isSecondModalShown && !secondarySection ? <ResolvedPathModal disabled={isUploading} /> : null}
    </>
  );
};
