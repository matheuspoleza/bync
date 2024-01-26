import { Section } from '@/components/Section';
import { Box } from '@/components/Utility';

export interface IReturnValueSection {
  onAddClick?: () => void;
}

export const ReturnValueSection: React.FC<IReturnValueSection> = ({ onAddClick }) => {
  return (
    <Box direction="column" pt={11}>
      <Section.Header.Container title="Return value" variant="active">
        {onAddClick && <Section.Header.Button iconName="Plus" onClick={onAddClick} />}
      </Section.Header.Container>
    </Box>
  );
};
