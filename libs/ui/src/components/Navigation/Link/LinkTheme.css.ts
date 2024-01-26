import { createTheme } from '@bync/style';

import { darkLinkTokens, linkLightTokens } from '@/styles/theme/components/link';

export const [light, vars] = createTheme(linkLightTokens);

export const dark = createTheme(vars, darkLinkTokens);
