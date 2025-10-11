
'use client';
import { createContext, useContext } from 'react';

import { Person } from "@prisma/client"

interface PersonDataContextType {
    person: Person;
}
const PersonDataContext = createContext<PersonDataContextType | undefined>(undefined);
export function PersonDataProvider({ children, person }: { children: React.ReactNode, person: Person }) {
    return (
        <PersonDataContext.Provider value={{ person }}>
            {children}
        </PersonDataContext.Provider>
    );
}




// هوک برای دسترسی به Context

export function usePersonData() {

    const context = useContext(PersonDataContext);
    if (!context) {

        throw new Error('usePersonData must be used within a PersonDataProvider');
    }
    return context;
}