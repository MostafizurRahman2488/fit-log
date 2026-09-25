"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext(null);

export const FitLogProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);
    const [saved, setSaved] = useState([]);
    const [completed, setCompleted] = useState([]);
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

            const storedCompleted =
                JSON.parse(localStorage.getItem("fitlog-completed")) || [];

            setPlan(storedPlan);
            setSaved(storedSaved);
            setCompleted(storedCompleted);
        } catch (error) {
            console.error("Failed to load FitLog data:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // ==========================================
    // Save plan
    // ==========================================
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );
    }, [plan, isLoaded]);

    // ==========================================
    // Save saved workouts
    // ==========================================
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(saved)
        );
    }, [saved, isLoaded]);

    // ==========================================
    // Save completed workouts
    // ==========================================
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog-completed",
            JSON.stringify(completed)
        );
    }, [completed, isLoaded]);

    // ==========================================
    // Add to plan
    // ==========================================
    const addToPlan = (workout) => {
        setPlan((previousPlan) => {
            const alreadyExists = previousPlan.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) {
                return previousPlan;
            }

            // Maximum 5 workouts
            if (previousPlan.length >= 5) {
                return previousPlan;
            }

            return [...previousPlan, workout];
        });
    };

    // ==========================================
    // Remove from plan
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

    // ==========================================
    // Mark workout as done
    // ==========================================
    const markAsDone = (workout) => {
        setCompleted((previousCompleted) => {
            const alreadyCompleted = previousCompleted.some(
                (item) => item.id === workout.id
            );

            if (alreadyCompleted) {
                return previousCompleted;
            }

            return [...previousCompleted, workout];
        });

        // Remove from today's plan
        setPlan((previousPlan) =>
            previousPlan.filter((item) => item.id !== workout.id)
        );
    };

    return (
        <FitLogContext.Provider
            value={{
                plan,
                saved,
                completed,
                isLoaded,

                addToPlan,
                removeFromPlan,

                saveWorkout,
                removeSavedWorkout,

                markAsDone,
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