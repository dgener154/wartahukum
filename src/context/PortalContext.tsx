import React, { createContext, useContext, ReactNode } from 'react';
import { usePortalStore } from '../services/store';

type PortalStoreType = ReturnType<typeof usePortalStore>;

const PortalContext = createContext<PortalStoreType | null>(null);

export function PortalProvider({ children }: { children: ReactNode }) {
  const store = usePortalStore();
  return <PortalContext.Provider value={store}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}
