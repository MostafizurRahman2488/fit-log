
"use client";

import { createContext, useContext, useState } from "react";

const FitLogContext = createContext(null);

export const FitLogProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);
    const [saved, setSaved] = useState([]);

    return (
        <FitLogContext.Provider
            value={{
                plan,
                setPlan,
                saved,
                setSaved,
            }}
        >
            {children}
        </FitLogContext.Provider>
    );
};

export const useFitLog = () => {
    const context = useContext(FitLogContext);

    if (!context) {
        throw new Error(
            "useFitLog must be used inside FitLogProvider"
        );
    }

    return context;
};

