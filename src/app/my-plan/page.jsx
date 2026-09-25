"use client";

import React, { useMemo, useState } from "react";
import PlanHeader from "@/components/my-plan/PlanHeader";
import MetricksSummery from "@/components/my-plan/MetricksSummery";
import PlanTabs from "@/components/my-plan/PlanTabs";
import PlanWorkoutCard from "@/components/my-plan/PlanWorkoutCard";
import EmptyState from "@/components/my-plan/EmptyState";
import { useFitLog } from "@/context/FitLogContext";

const MyPlanPage = () => {
    const {
        plan,
        saved,
        isLoaded,
    } = useFitLog();

    const [activeTab, setActiveTab] = useState("today");

    // ==========================================
    // Current list
    // ==========================================
    const currentWorkouts =
        activeTab === "today"
            ? plan
            : saved;

    // ==========================================
    // Metrics
    // ==========================================
    const totalExercises = plan.length;

    const totalMinutes = useMemo(() => {
        return plan.reduce(
            (total, workout) =>
                total + Number(workout.duration || 0),
            0
        );
    }, [plan]);

    const totalCalories = useMemo(() => {
        return plan.reduce(
            (total, workout) =>
                total + Number(workout.caloriesBurned || 0),
            0
        );
    }, [plan]);

    // ==========================================
    // Loading
    // ==========================================
    if (!isLoaded) {
        return (
            <main className="min-h-screen bg-[#0d0f12] px-4 py-10 text-white">
                <div className="mx-auto flex min-h-[300px] max-w-[1200px] items-center justify-center">
                    <p className="text-sm text-[#85898f]">
                        Loading workouts…
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-[#0d0f12] px-4 py-8 text-white sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1200px]">

                {/* ================= HEADER ================= */}
                <PlanHeader />

                {/* ================= METRICS ================= */}
                <MetricksSummery
                    exercises={totalExercises}
                    minutes={totalMinutes}
                    calories={totalCalories}
                />

                {/* ================= TABS ================= */}
                <PlanTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    planCount={plan.length}
                    savedCount={saved.length}
                />

                {/* ================= WORKOUTS ================= */}
                <section className="mt-5">

                    {currentWorkouts.length === 0 ? (
                        <EmptyState
                            activeTab={activeTab}
                        />
                    ) : (
                        <div className="space-y-3">
                            {currentWorkouts.map((workout) => (
                                <PlanWorkoutCard
                                    key={workout.id}
                                    workout={workout}
                                    activeTab={activeTab}
                                />
                            ))}
                        </div>
                    )}

                </section>
            </div>
        </main>
    );
};

export default MyPlanPage;