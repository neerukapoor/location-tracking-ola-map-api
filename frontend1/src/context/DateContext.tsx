import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextType {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const useDateContext = (): DateContextType => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('useDateContext must be used within a DateProvider');
    }
    return context;
};

export const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};
