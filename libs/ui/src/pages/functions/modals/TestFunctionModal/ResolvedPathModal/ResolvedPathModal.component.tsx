import { Divider, Link } from '@/components';
import { CodeEditor } from '@/components/Inputs/CodeEditor';
import { codeEditorJSONFixture as MOCK_JSON } from '@/components/Inputs/CodeEditor/CodeEditorInput/utils/__fixtures__/json';
import { Modal } from '@/components/Modal';
import { DotSeparator } from '@/components/Other/DotSeparator';
import { Mapper } from '@/components/Other/Mapper';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import { Collapsible, CollapsibleHeader, CollapsibleHeaderButton } from '@/components/Utility/Collapsible';
import { Tokens } from '@/styles';

import { VariableComponent } from './mock';
import {
  jsonCollapsibleStyles,
  jsonEditorStyles,
  mapperStyles,
  modalContainerRecipe,
  rhsMapperStyles,
  sectionRecipe,
} from './ResolvedPathModal.css';

const { colors } = Tokens;
export interface IResolvedPathModal {
  error?: boolean;
  disabled?: boolean;
  hasResolvedPath?: boolean;
  isTracesOpen?: boolean;
  hasOutputVars?: boolean;
  onDownloadLogs?: () => void;
}

export const ResolvedPathModal: React.FC<IResolvedPathModal> = ({
  error = false,
  disabled = false,
  hasResolvedPath = true,
  hasOutputVars = true,
  isTracesOpen = false,
  onDownloadLogs,
}) => {
  return (
    <Modal.Container width="400px" className={modalContainerRecipe({ disabled })}>
      {hasResolvedPath && !error && (
        <>
          <Collapsible
            isDisabled={disabled}
            isOpen={true}
            isEmpty={false}
            showDivider={false}
            contentClassName={sectionRecipe({ disabled })}
            header={
              <CollapsibleHeader isDisabled={disabled} label="Resolved path">
                {({ isOpen }) => <CollapsibleHeaderButton disabled={disabled} isOpen={isOpen} />}
              </CollapsibleHeader>
            }
          >
            <Box className={mapperStyles}>
              <Mapper
                equalityIcon="arrow"
                leftHandSide={[<VariableComponent value="Variable 1" key="0" />]}
                rightHandSide={[
                  <Text key="00" variant="basic" className={rhsMapperStyles}>
                    Right value - a longer one to test the paddings
                  </Text>,
                ]}
              />
            </Box>
          </Collapsible>

          <Divider noPadding />
        </>
      )}
      {hasOutputVars && !error && (
        <>
          <Collapsible
            isDisabled={disabled}
            isOpen={true}
            isEmpty={false}
            showDivider={false}
            contentClassName={sectionRecipe({ disabled })}
            header={
              <CollapsibleHeader isDisabled={disabled} label="Output variables">
                {({ isOpen }) => <CollapsibleHeaderButton disabled={disabled} isOpen={isOpen} />}
              </CollapsibleHeader>
            }
          >
            <Box direction="column" className={mapperStyles}>
              <Mapper
                equalityIcon="equal"
                leftHandSide={[<VariableComponent value="Credit_score" key="0" id="id1" />]}
                rightHandSide={[
                  <Text key="00" variant="basic" className={rhsMapperStyles}>
                    Right value
                  </Text>,
                ]}
              />
              <Mapper
                equalityIcon="equal"
                leftHandSide={[<VariableComponent value="Credit_card_ID" key="1" id="id2" />]}
                rightHandSide={[
                  <Text key="00" variant="basic" className={rhsMapperStyles}>
                    Right value
                  </Text>,
                ]}
              />
              <Mapper
                equalityIcon="equal"
                leftHandSide={[<VariableComponent value="Last_update" key="2" id="id3" />]}
                rightHandSide={[
                  <Text key="00" variant="basic" className={rhsMapperStyles}>
                    Right value but a very long one to see how it will look like truncated with an ellipsis on the
                    fourth line hehe
                  </Text>,
                ]}
              />
            </Box>
          </Collapsible>
          <Divider noPadding />
        </>
      )}
      <Collapsible
        contentClassName={jsonCollapsibleStyles}
        isDisabled={disabled}
        showDivider={false}
        isOpen={error || isTracesOpen}
        isEmpty={false}
        header={
          <CollapsibleHeader isDisabled={disabled} label="Traces">
            {({ isOpen }) => <CollapsibleHeaderButton disabled={disabled} isOpen={isOpen} />}
          </CollapsibleHeader>
        }
      >
        <CodeEditor
          className={jsonEditorStyles}
          disabled={disabled}
          readOnly
          theme="light"
          language="json"
          isFunctionEditor
          value={MOCK_JSON}
        />
      </Collapsible>
      <Divider noPadding />
      <Box
        id="output-status-footer"
        px={24}
        py={12}
        justify="space-between"
        align="center"
        className={sectionRecipe({ disabled })}
      >
        <Box gap={11} align="center">
          <Text variant="caption" weight="semiBold" color={error ? colors.alert.alert700 : colors.success.success600}>
            {error ? 'Error' : 'Success'}
          </Text>
          <DotSeparator light />
          <Text variant="caption" color={colors.neutralDark.neutralsDark50}>
            281ms
          </Text>
        </Box>
        <Link
          disabled={disabled}
          className={sectionRecipe({ disabled })}
          label="Download logs"
          variant="primary"
          size="small"
          weight="semiBold"
          onClick={onDownloadLogs}
        />
      </Box>
    </Modal.Container>
  );
};
