"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    FaClock,
    FaFire,
    FaTrash,
    FaArrowRight,
} from "react-icons/fa";
import { useFitLog } from "@/context/FitLogContext";

const MyPlanPage = () => {
    const {
        plan,
        saved,
        removeFromPlan,
        removeSavedWorkout,
    } = useFitLog();

    const [activeTab, setActiveTab] = useState("today");
    const [sortBy, setSortBy] = useState("duration");

    // ==========================================
    // Current tab data
    // ==========================================
    const currentWorkouts =
        activeTab === "today"
            ? plan
            : saved;

    // ==========================================
    // Sort
    // ==========================================
    const sortedWorkouts = useMemo(() => {
        const data = [...currentWorkouts];

        if (sortBy === "duration") {
            data.sort(
                (a, b) =>
                    Number(a.duration || 0) -
                    Number(b.duration || 0)
            );
        }

        if (sortBy === "calories") {
            data.sort(
                (a, b) =>
                    Number(b.caloriesBurned || 0) -
                    Number(a.caloriesBurned || 0)
            );
        }

        if (sortBy === "name") {
            data.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        return data;
    }, [currentWorkouts, sortBy]);

    // ==========================================
    // Metrics
    // ==========================================
    const totalExercises = plan.length;

    const totalMinutes = plan.reduce(
        (total, workout) =>
            total + Number(workout.duration || 0),
        0
    );

    const totalCalories = plan.reduce(
        (total, workout) =>
            total + Number(workout.caloriesBurned || 0),
        0
    );

    // ==========================================
    // Remove
    // ==========================================
    const handleRemove = (id) => {
        if (activeTab === "today") {
            removeFromPlan(id);
        } else {
            removeSavedWorkout(id);
        }
    };

    return (
        <main className="min-h-screen w-full bg-[#0d0f12] px-4 py-8 text-white sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1200px]">

                {/* HEADER */}
                <div className="mb-5">
                    <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                        MY PLAN
                    </h1>

                    <p className="mt-1 text-xs text-[#85898f] sm:text-sm">
                        Manage your today's workouts and saved workouts.
                    </p>
                </div>

                {/* METRICS */}
                <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[#25282d] bg-[#15171c] sm:grid-cols-3">

                    <div className="border-b border-[#25282d] px-5 py-6 sm:border-b-0 sm:border-r">
                        <p className="text-[10px] text-[#85898f]">
                            Exercises
                        </p>

                        <p className="mt-1 text-3xl font-extrabold text-[#b8ff00]">
                            {totalExercises}
                        </p>
                    </div>

                    <div className="border-b border-[#25282d] px-5 py-6 sm:border-b-0 sm:border-r">
                        <p className="text-[10px] text-[#85898f]">
                            Minutes
                        </p>

                        <p className="mt-1 text-3xl font-extrabold text-white">
                            {totalMinutes}
                        </p>
                    </div>

                    <div className="px-5 py-6">
                        <p className="text-[10px] text-[#85898f]">
                            Calories
                        </p>

                        <p className="mt-1 text-3xl font-extrabold text-white">
                            {totalCalories}
                        </p>
                    </div>
                </div>

                {/* TABS + SORT */}
                <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    {/* TABS */}
                    <div className="flex w-fit rounded-lg border border-[#25282d] bg-[#15171c] p-1">

                        <button
                            onClick={() => setActiveTab("today")}
                            className={`rounded-md px-4 py-2 text-[10px] font-medium transition ${
                                activeTab === "today"
                                    ? "bg-[#20242b] text-white"
                                    : "text-[#85898f] hover:text-white"
                            }`}
                        >
                            Today's Plan
                            <span className="ml-2 text-[#b8ff00]">
                                {plan.length}
                            </span>
                        </button>

                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`rounded-md px-5 py-2 text-[10px] font-semibold transition ${
                                activeTab === "saved"
                                    ? "bg-[#20242b] text-white"
                                    : "text-[#85898f] hover:text-white"
                            }`}
                        >
                            Saved
                            <span className="ml-2 text-[#b8ff00]">
                                {saved.length}
                            </span>
                        </button>
                    </div>

                    {/* SORT */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#85898f]">
                            Sort By
                        </span>

                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value)
                            }
                            className="rounded-lg border border-[#25282d] bg-[#15171c] px-3 py-2 text-[10px] text-gray-300 outline-none"
                        >
                            <option value="duration">
                                Duration
                            </option>

                            <option value="calories">
                                Calories
                            </option>

                            <option value="name">
                                Name
                            </option>
                        </select>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="mt-5">

                    {sortedWorkouts.length === 0 ? (
                        <div className="flex min-h-[235px] items-center justify-center rounded-xl border border-dashed border-[#25282d]">
                            <div className="text-center">

                                <h2 className="text-base font-extrabold uppercase tracking-wide text-white">
                                    {activeTab === "today"
                                        ? "NOTHING HERE YET"
                                        : "NOTHING SAVED YET"}
                                </h2>

                                <p className="mt-1 text-[10px] text-[#85898f]">
                                    {activeTab === "today"
                                        ? "Browse workouts and add one to today's plan."
                                        : "Save your favorite workouts for later."}
                                </p>

                                <Link
                                    href="/"
                                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#b8ff00] px-5 py-2.5 text-[10px] font-bold text-black transition hover:bg-[#c7ff33]"
                                >
                                    Go to workouts
                                    <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">

                            {sortedWorkouts.map((work) => (
                                <article
                                    key={work.id}
                                    className="flex flex-col gap-4 rounded-xl border border-[#25282d] bg-[#15171c] p-4 transition hover:border-[#b8ff00]/30 sm:flex-row sm:items-center"
                                >

                                    {/* IMAGE */}
                                    <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-[#101216] sm:w-32">
                                        <Image
                                            src={work.image}
                                            alt={work.name}
                                            fill
                                            sizes="128px"
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* CONTENT */}
                                    <div className="min-w-0 flex-1">

                                        <h2 className="truncate text-sm font-bold uppercase text-white">
                                            {work.name}
                                        </h2>

                                        <p className="mt-1 line-clamp-2 text-xs text-[#85898f]">
                                            {work.description}
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-4 text-[10px] text-[#85898f]">

                                            <span className="flex items-center gap-1.5">
                                                <FaClock className="text-[#b8ff00]" />
                                                {work.duration} min
                                            </span>

                                            <span className="flex items-center gap-1.5">
                                                <FaFire className="text-[#b8ff00]" />
                                                {work.caloriesBurned} kcal
                                            </span>

                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

                                        {/* VIEW DETAILS */}
                                        <Link
                                            href={`/workouts/${work.id}`}
                                            className="flex items-center justify-center gap-2 rounded-lg bg-[#b8ff00] px-4 py-2 text-[10px] font-bold text-black transition hover:bg-[#c7ff33]"
                                        >
                                            View Details
                                        </Link>

                                        {/* REMOVE */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemove(work.id)
                                            }
                                            className="flex items-center justify-center gap-2 rounded-lg border border-[#30343c] px-4 py-2 text-[10px] font-semibold text-gray-400 transition hover:border-red-500/40 hover:text-red-400"
                                        >
                                            <FaTrash />
                                            Remove
                                        </button>

                                    </div>
                                </article>
                            ))}

                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default MyPlanPage;