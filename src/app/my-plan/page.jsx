"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    FaClock,
    FaFire,
    FaTrash,
    FaArrowRight,
} from "react-icons/fa";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const MyPlanPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [activeTab, setActiveTab] = useState("today");
    const [sortBy, setSortBy] = useState("duration");
    const [loading, setLoading] = useState(true);

    // ==========================================
    // Get today's plan IDs from localStorage
    // ==========================================
    useEffect(() => {
        const loadPlan = async () => {
            try {
                const storedIds =
                    JSON.parse(localStorage.getItem("todayPlan")) || [];

                if (storedIds.length === 0) {
                    setWorkouts([]);
                    setLoading(false);
                    return;
                }

                const workoutData = await Promise.all(
                    storedIds.map(async (id) => {
                        const res = await fetch(`${API_URL}/${id}`);

                        if (!res.ok) {
                            throw new Error("Failed to fetch workout");
                        }

                        return res.json();
                    })
                );

                setWorkouts(workoutData);
            } catch (error) {
                console.error(error);
                setWorkouts([]);
            } finally {
                setLoading(false);
            }
        };

        loadPlan();
    }, []);

    // ==========================================
    // Remove workout
    // ==========================================
    const handleRemove = (id) => {
        const updatedWorkouts = workouts.filter(
            (workout) => workout.id !== id
        );

        setWorkouts(updatedWorkouts);

        const ids = updatedWorkouts.map((workout) => workout.id);

        localStorage.setItem("todayPlan", JSON.stringify(ids));
    };

    // ==========================================
    // Sort workouts
    // ==========================================
    const sortedWorkouts = useMemo(() => {
        const data = [...workouts];

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
    }, [workouts, sortBy]);

    // ==========================================
    // Metrics
    // ==========================================
    const totalExercises = workouts.length;

    const totalMinutes = workouts.reduce(
        (total, workout) =>
            total + Number(workout.duration || 0),
        0
    );

    const totalCalories = workouts.reduce(
        (total, workout) =>
            total + Number(workout.caloriesBurned || 0),
        0
    );

    return (
        <main className="min-h-screen w-full bg-[#0d0f12] px-4 py-8 text-white sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1200px]">

                {/* ================= HEADER ================= */}
                <div className="mb-5">
                    <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                        MY PLAN
                    </h1>

                    <p className="mt-1 text-xs text-[#85898f] sm:text-sm">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                {/* ================= METRICS ================= */}
                <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[#25282d] bg-[#15171c] sm:grid-cols-3">

                    {/* Exercises */}
                    <div className="border-b border-[#25282d] px-5 py-6 sm:border-b-0 sm:border-r">
                        <p className="text-[10px] text-[#85898f]">
                            Exercises
                        </p>

                        <p className="mt-1 text-3xl font-extrabold text-[#b8ff00]">
                            {totalExercises}
                        </p>
                    </div>

                    {/* Minutes */}
                    <div className="border-b border-[#25282d] px-5 py-6 sm:border-b-0 sm:border-r">
                        <p className="text-[10px] text-[#85898f]">
                            Minutes
                        </p>

                        <p className="mt-1 text-3xl font-extrabold text-white">
                            {totalMinutes}
                        </p>
                    </div>

                    {/* Calories */}
                    <div className="px-5 py-6">
                        <p className="text-[10px] text-[#85898f]">
                            Calories
                        </p>

                        <p className="mt-1 text-3xl font-extrabold text-white">
                            {totalCalories}
                        </p>
                    </div>
                </div>

                {/* ================= TABS + SORT ================= */}
                <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    {/* Tabs */}
                    <div className="flex w-fit rounded-lg border border-[#25282d] bg-[#15171c] p-1">

                        <button
                            onClick={() => setActiveTab("today")}
                            className={`rounded-md px-4 py-2 text-[10px] font-medium transition ${activeTab === "today"
                                ? "bg-[#20242b] text-white"
                                : "text-[#85898f] hover:text-white"
                                }`}
                        >
                            Today's Plan
                        </button>

                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`rounded-md px-5 py-2 text-[10px] font-semibold transition ${activeTab === "saved"
                                ? "bg-[#20242b] text-white"
                                : "text-[#85898f] hover:text-white"
                                }`}
                        >
                            Saved
                        </button>
                    </div>

                    {/* Sort */}
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

                {/* ================= CONTENT ================= */}
                <div className="mt-5">

                    {loading ? (
                        <div className="flex min-h-[235px] items-center justify-center rounded-xl border border-dashed border-[#25282d]">
                            <p className="text-xs text-[#85898f]">
                                Loading your plan...
                            </p>
                        </div>
                    ) : activeTab === "saved" ? (
                        <div className="flex min-h-[235px] items-center justify-center rounded-xl border border-dashed border-[#25282d]">
                            <div className="text-center">
                                <h2 className="text-base font-extrabold uppercase">
                                    NOTHING SAVED YET
                                </h2>

                                <p className="mt-1 text-[10px] text-[#85898f]">
                                    Save your favorite workouts for later.
                                </p>

                                <Link
                                    href="/workouts"
                                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#b8ff00] px-5 py-2.5 text-[10px] font-bold text-black transition hover:bg-[#c7ff33]"
                                >
                                    Go to workouts
                                    <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    ) : sortedWorkouts.length === 0 ? (

                        /* ================= EMPTY STATE ================= */
                        <div className="flex min-h-[235px] items-center justify-center rounded-xl border border-dashed border-[#25282d]">
                            <div className="text-center">

                                <h2 className="text-base font-extrabold uppercase tracking-wide text-white">
                                    NOTHING HERE YET
                                </h2>

                                <p className="mt-1 text-[10px] text-[#85898f]">
                                    Browse the library and add a lift to get today moving.
                                </p>

                                <Link
                                    href="/workouts"
                                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#b8ff00] px-5 py-2.5 text-[10px] font-bold text-black shadow-lg transition hover:bg-[#c7ff33]"
                                >
                                    Go to workouts
                                    <FaArrowRight />
                                </Link>

                            </div>
                        </div>

                    ) : (

                        /* ================= WORKOUT LIST ================= */
                        <div className="space-y-3">

                            {sortedWorkouts.map((work) => (
                                <article
                                    key={work.id}
                                    className="flex flex-col gap-4 rounded-xl border border-[#25282d] bg-[#15171c] p-4 transition hover:border-[#b8ff00]/30 sm:flex-row sm:items-center"
                                >

                                    {/* Image */}
                                    <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-[#101216] sm:w-32">
                                        <Image
                                            src={work.image}
                                            alt={work.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
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

                                    {/* Remove */}
                                    <button
                                        onClick={() =>
                                            handleRemove(work.id)
                                        }
                                        className="flex items-center justify-center gap-2 rounded-lg border border-[#30343c] px-4 py-2 text-[10px] font-semibold text-gray-400 transition hover:border-red-500/40 hover:text-red-400"
                                    >
                                        <FaTrash />
                                        Remove
                                    </button>

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