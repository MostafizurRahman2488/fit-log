
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
        <section className="bg-[#0d0f11]">
            <div className="container mx-auto px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pb-16 lg:pt-8 xl:px-10">

                {/* Section Header */}
                <div className="mb-6 sm:mb-7">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        THE LIBRARY
                    </h2>

                    <p className="mt-1 text-xs text-[#85898f] sm:text-sm">
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>

                {/* Workout Grid */}
                {workouts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

