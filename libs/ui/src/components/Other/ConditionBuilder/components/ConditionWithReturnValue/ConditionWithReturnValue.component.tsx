import { Button } from '@/components/Buttons';
import { Link } from '@/components/Navigation';
import { Section } from '@/components/Section';
import { Text } from '@/components/Text';
import type { IBox } from '@/components/Utility';
import { Box } from '@/components/Utility';

import { buttonStyles, captionStyles, turnsStyles } from './ConditionWithReturnValue.css';

export interface IConditionWithReturnValue extends IBox {
  onHelpClick: () => void;
  numberOfTurns?: number;
  onPersonaBtnClick?: () => void;
}

export const ConditionWithReturnValue: React.FC<IConditionWithReturnValue> = ({
  onHelpClick,
  numberOfTurns,
  onPersonaBtnClick,
  children,
}) => {
  return (
    <>
      <Section.Header.Container title="Condition" variant="active">
        {/* potential tooltip here */}
        {onHelpClick && <Section.Header.Button iconName="Question" onClick={onHelpClick} />}
      </Section.Header.Container>
      <Box px={24} direction="column" pb={20}>
        <Box align="center">
          <Text variant="caption" className={captionStyles}>
            Evaluate using prompt with
          </Text>

          <Link label={`${numberOfTurns ?? 0} turns`} variant="dotted" className={turnsStyles} />

          <Text variant="caption" className={captionStyles}>
            of memory
          </Text>
        </Box>
        {children}
        <Button
          className={buttonStyles}
          variant="tertiary"
          size="small"
          label="Persona"
          iconName="Persona"
          onClick={onPersonaBtnClick}
          isActive={false}
        />
      </Box>
    </>
  );
};
