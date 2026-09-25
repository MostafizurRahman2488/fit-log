"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
    Clock3,
    Flame,
    Star,
    Check,
    X,
} from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

const PlanWorkoutCard = ({
    workout,
    activeTab = "today",
}) => {
    const {
        removeFromPlan,
        removeSavedWorkout,
        markAsDone,
    } = useFitLog();

    const handleRemove = () => {
        if (activeTab === "today") {
            removeFromPlan(workout.id);
        } else {
            removeSavedWorkout(workout.id);
        }
    };

    const handleDone = () => {
        markAsDone(workout);
    };

    return (
        <article className="group rounded-xl border border-[#25282d] bg-[#15171c] p-4 transition hover:border-[#b8ff00]/30">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                {/* THUMBNAIL */}
                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-[#101216] sm:h-24 sm:w-36">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="144px"
                        className="object-cover transition duration-300 group-hover:scale-105"
                    />
                </div>

                {/* INFO */}
                <div className="min-w-0 flex-1">

                    <h2 className="text-base font-extrabold uppercase tracking-wide text-white">
                        {workout.name}
                    </h2>

                    <p className="mt-1 text-xs text-[#85898f]">
                        {workout.equipment}
                    </p>

                    {/* STATS */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] text-[#85898f]">

                        <span className="flex items-center gap-1.5">
                            <Clock3
                                size={13}
                                className="text-[#b8ff00]"
                            />
                            {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1.5">
                            <Flame
                                size={13}
                                className="text-[#b8ff00]"
                            />
                            {workout.caloriesBurned} kcal
                        </span>

                        <span className="flex items-center gap-1.5">
                            <Star
                                size={13}
                                className="text-[#b8ff00]"
                                fill="currentColor"
                            />
                            {workout.rating}
                        </span>

                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col">

                    {/* VIEW DETAILS */}
                    <Link
                        href={`/workouts/${workout.id}`}
                        className="inline-flex items-center justify-center rounded-lg bg-[#b8ff00] px-4 py-2.5 text-[10px] font-bold text-black transition hover:bg-[#c8ff3d]"
                    >
                        View Details
                    </Link>

                    {/* MARK AS DONE */}
                    {activeTab === "today" && (
                        <button
                            type="button"
                            onClick={handleDone}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#30343c] px-4 py-2.5 text-[10px] font-semibold text-gray-300 transition hover:border-[#b8ff00] hover:text-[#b8ff00]"
                        >
                            <Check size={13} />
                            Mark as Done
                        </button>
                    )}

                    {/* REMOVE */}
                    <button
                        type="button"
                        onClick={handleRemove}
                        aria-label={`Remove ${workout.name}`}
                        className="inline-flex items-center justify-center rounded-lg border border-[#30343c] px-3 py-2.5 text-gray-400 transition hover:border-red-500 hover:text-red-400"
                    >
                        <X size={15} />
                    </button>

                </div>
            </div>
        </article>
    );
};

export default PlanWorkoutCard;