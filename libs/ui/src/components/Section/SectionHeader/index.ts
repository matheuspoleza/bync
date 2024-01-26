import { SectionHeaderButton, SectionHeaderCaption } from './components';
import { SectionHeader as SectionHeaderComponent } from './SectionHeader.component';

export type { ISectionHeader } from './SectionHeader.component';

export const SectionHeader = Object.assign(SectionHeaderComponent, {
  Container: SectionHeaderComponent,
  Button: SectionHeaderButton,
  Caption: SectionHeaderCaption,
});
