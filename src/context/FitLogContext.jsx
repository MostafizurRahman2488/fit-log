"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext(null);

export const FitLogProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);
    const [saved, setSaved] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // ==========================================
    // Load data from localStorage
    // ==========================================
    useEffect(() => {
        try {
            const storedPlan =
                JSON.parse(localStorage.getItem("fitlog-plan")) || [];

            const storedSaved =
                JSON.parse(localStorage.getItem("fitlog-saved")) || [];

            setPlan(storedPlan);
            setSaved(storedSaved);
        } catch (error) {
            console.error("Failed to load FitLog data:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // ==========================================
    // Save plan to localStorage
    // ==========================================
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );
    }, [plan, isLoaded]);

    // ==========================================
    // Save saved workouts to localStorage
    // ==========================================
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(saved)
        );
    }, [saved, isLoaded]);

    // ==========================================
    // Add workout to today's plan
    // ==========================================
    const addToPlan = (workout) => {
        setPlan((previousPlan) => {
            const alreadyExists = previousPlan.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) {
                return previousPlan;
            }

            return [...previousPlan, workout];
        });
    };

    // ==========================================
    // Remove workout from today's plan
    // ==========================================
    const removeFromPlan = (id) => {
        setPlan((previousPlan) =>
            previousPlan.filter((item) => item.id !== id)
        );
    };

    // ==========================================
    // Save workout
    // ==========================================
    const saveWorkout = (workout) => {
        setSaved((previousSaved) => {
            const alreadyExists = previousSaved.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) {
                return previousSaved;
            }

            return [...previousSaved, workout];
        });
    };

    // ==========================================
    // Remove saved workout
    // ==========================================
    const removeSavedWorkout = (id) => {
        setSaved((previousSaved) =>
            previousSaved.filter((item) => item.id !== id)
        );
    };

    return (
        <FitLogContext.Provider
            value={{
                plan,
                saved,
                isLoaded,

                addToPlan,
                removeFromPlan,

                saveWorkout,
                removeSavedWorkout,
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