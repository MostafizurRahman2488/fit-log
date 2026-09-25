"use client";

import React from "react";
import { Bookmark, Plus, Check } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

const WorkoutActions = ({ work }) => {
    const {
        plan,
        setPlan,
        saved,
        setSaved,
    } = useFitLog();

    const isInPlan = plan.some((item) => item.id === work.id);
    const isSaved = saved.some((item) => item.id === work.id);

    const handleAddToPlan = () => {
        if (isInPlan) return;

        setPlan((previousPlan) => [
            ...previousPlan,
            work,
        ]);
    };

    const handleSave = () => {
        if (isSaved) {
            setSaved((previousSaved) =>
                previousSaved.filter((item) => item.id !== work.id)
            );

            return;
        }

        setSaved((previousSaved) => [
            ...previousSaved,
            work,
        ]);
    };

    return (
        <div className="mt-8 flex w-full flex-col gap-3 pb-8 sm:flex-row">
            <button
                type="button"
                onClick={handleAddToPlan}
                disabled={isInPlan}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#b8ff00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#c9ff4d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
                {isInPlan ? (
                    <>
                        <Check size={16} />
                        Added to today's plan
                    </>
                ) : (
                    <>
                        <Plus size={16} />
                        Add to today's plan
                    </>
                )}
            </button>

            <button
                type="button"
                onClick={handleSave}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#30343c] bg-transparent px-5 py-3 text-xs font-medium text-gray-300 transition hover:bg-[#191c21] sm:w-auto"
            >
                <Bookmark
                    size={16}
                    fill={isSaved ? "currentColor" : "none"}
                />

                {isSaved ? "Saved" : "Save for later"}
            </button>
        </div>
    );
};

export default WorkoutActions;