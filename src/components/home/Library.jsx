import React from "react";
import WorkoutCard from "./WorkoutCard";

const getWorkouts = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/fitlog",
        {
            next: {
                revalidate: 60,
            },
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch workouts: ${res.status}`);
    }

    return res.json();
};

const Library = async () => {
    const workouts = await getWorkouts();

    return (
        <section className="bg-[#0d0f11] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-[#b8ff00] sm:text-xs">
                            EXPLORE
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Workout Library
                        </h1>

                        <p className="mt-1 text-xs text-[#85898f] sm:text-sm">
                            Find the right workout and build your training routine.
                        </p>
                    </div>

                    {/* Total */}
                    <div className="flex items-center gap-2 text-xs text-[#85898f]">
                        <span>Total workouts</span>

                        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#243b08] px-2 font-bold text-[#b8ff00]">
                            {workouts.length}
                        </span>
                    </div>

                </div>

                {/* Workout Grid */}
                {workouts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {workouts.map((work) => (
                            <WorkoutCard
                                key={work.id}
                                work={work}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-[#25282d] bg-[#15171c] py-16 text-center">
                        <p className="text-sm font-medium text-white">
                            No workouts found.
                        </p>

                        <p className="mt-1 text-xs text-[#85898f]">
                            Please try again later.
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default Library;