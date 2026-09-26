
"use client";

import { useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";


const Library = ({ initialWorkouts }) => {
    const [sortBy, setSortBy] = useState("duration");

    const sortedWorkouts = useMemo(() => {
        const sorted = [...initialWorkouts];

        sorted.sort((a, b) => {
            if (sortBy === "duration") {
                return Number(a.duration) - Number(b.duration);
            }

            if (sortBy === "calories") {
                return (
                    Number(b.caloriesBurned) -
                    Number(a.caloriesBurned)
                );
            }

            if (sortBy === "rating") {
                return Number(b.rating) - Number(a.rating);
            }

            return 0;
        });

        return sorted;
    }, [initialWorkouts, sortBy]);

    return (
        <section id="library" className="bg-[#0d0f11]">
            <div className="container mx-auto px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pb-16 lg:pt-8 xl:px-10">

                {/* Section Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            THE LIBRARY
                        </h2>

                        <p className="mt-1 text-xs text-[#85898f] sm:text-sm">
                            Twelve lifts covering every major muscle group.
                        </p>
                    </div>

                    {/* Sort Dropdown */}
                    <SortDropdown
                        value={sortBy}
                        onChange={setSortBy}
                    />
                </div>

                {/* Workout Grid */}
                {sortedWorkouts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedWorkouts.map((work) => (
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

