"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext(null);

export const FitLogProvider = ({ children }) => {
    const [todayPlan, setTodayPlan] = useState([]);
    const [saved, setSaved] = useState([]);
    const [done, setDone] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    // ==========================================
    // Load data from localStorage
    // ==========================================
    useEffect(() => {
        try {
            const storedPlan =
                JSON.parse(localStorage.getItem("todayPlan")) || [];

            const storedSaved =
                JSON.parse(localStorage.getItem("savedWorkouts")) || [];

            const storedDone =
                JSON.parse(localStorage.getItem("doneWorkouts")) || [];

            setTodayPlan(storedPlan);
            setSaved(storedSaved);
            setDone(storedDone);
        } catch (error) {
            console.error("Failed to load FitLog data:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // ==========================================
    // Save today's plan
    // ==========================================
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "todayPlan",
            JSON.stringify(todayPlan)
        );
    }, [todayPlan, isLoaded]);

    // ==========================================
    // Save saved workouts
    // ==========================================
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "savedWorkouts",
            JSON.stringify(saved)
        );
    }, [saved, isLoaded]);

    // ==========================================
    // Save completed workouts
    // ==========================================
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "doneWorkouts",
            JSON.stringify(done)
        );
    }, [done, isLoaded]);

    // ==========================================
    // Add workout to today's plan
    // ==========================================
    const addToPlan = (workout) => {
        setTodayPlan((current) => {
            const alreadyExists = current.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) {
                return current;
            }

            // Maximum 5 workouts
            if (current.length >= 5) {
                return current;
            }

            return [...current, workout];
        });
    };

    // ==========================================
    // Remove workout from today's plan
    // ==========================================
    const removeFromPlan = (id) => {
        setTodayPlan((current) =>
            current.filter((item) => item.id !== id)
        );
    };

    // ==========================================
    // Save workout
    // ==========================================
    const saveWorkout = (workout) => {
        setSaved((current) => {
            const alreadyExists = current.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) {
                return current;
            }

            return [...current, workout];
        });
    };

    // ==========================================
    // Remove saved workout
    // ==========================================
    const removeSaved = (id) => {
        setSaved((current) =>
            current.filter((item) => item.id !== id)
        );
    };

    // ==========================================
    // Mark workout as done
    // ==========================================
    const markAsDone = (id) => {
        setDone((current) => {
            if (current.includes(id)) {
                return current;
            }

            return [...current, id];
        });
    };

    // ==========================================
    // Context values
    // ==========================================
    const value = {
        todayPlan,
        saved,
        done,
        isLoaded,

        addToPlan,
        removeFromPlan,

        saveWorkout,
        removeSaved,

        markAsDone,
    };

    return (
        <FitLogContext.Provider value={value}>
            {children}
        </FitLogContext.Provider>
    );
};

// ==========================================
// Custom Hook
// ==========================================
export const useFitLog = () => {
    const context = useContext(FitLogContext);

    if (!context) {
        throw new Error(
            "useFitLog must be used inside FitLogProvider"
        );
    }

    return context;
};