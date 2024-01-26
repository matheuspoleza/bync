import { useState } from 'react';

export const useTabChange = <T extends string>(initialTab: T) => {
  const [activeTab, setActiveTab] = useState<T>(initialTab);

  const switchTab = (newTab: T) => {
    setActiveTab(newTab);
  };

  return {
    activeTab,
    switchTab,
  };
};
