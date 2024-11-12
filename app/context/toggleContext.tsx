'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ViewState = 'viewOne' | 'viewTwo';

interface ViewContextType {
    view: ViewState;
    setView: (view: ViewState) => void;
}

    const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
    const [view, setView] = useState<ViewState>('viewTwo');

    return (
        <ViewContext.Provider value={{ view, setView }}>
            {children}
        </ViewContext.Provider>
    );
};

export const useView = (): ViewContextType => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error('useView must be used within a ViewProvider');
    }
    return context;
};
