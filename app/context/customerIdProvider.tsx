// IDContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface IDContextType {
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
}

// Create the context
const IDContext = createContext<IDContextType | undefined>(undefined);

// Custom hook to use the context
export const useIDContext = () => {
    const context = useContext(IDContext);
    if (!context) {
        throw new Error('useIDContext must be used within an IDProvider');
    }
    return context;
};

// Provider component to wrap around children
export const IDProvider = ({ children }: { children: ReactNode }) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <IDContext.Provider value={{ selectedId, setSelectedId }}>
            {children}
        </IDContext.Provider>
    );
};
