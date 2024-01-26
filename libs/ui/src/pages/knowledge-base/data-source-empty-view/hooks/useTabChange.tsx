import { useState } from 'react';

export const useTabChange = (initialTab: string) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const switchTab = (newTab: string) => {
    setActiveTab(newTab);
  };

  return {
    activeTab,
    switchTab,
  };
};
