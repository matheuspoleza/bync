import { createContext } from 'react';

/**
 * Used to toggle demo mode for stories that appear in the documentation site.
 */
export const DemoContext = createContext(false);

export const { Provider: DemoProvider } = DemoContext;
