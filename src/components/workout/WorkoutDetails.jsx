import Image from "next/image";
import React from "react";
import WorkoutSpecs from "./WorkoutSpecs";
import Instructions from "./Instructions";
import WorkoutActions from "./WorkoutActions";

const WorkoutDetails = ({ work }) => {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-[#0d0f12] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto w-full max-w-[1200px]">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">

                    {/* ================= LEFT SIDE ================= */}
                    {/* ================= LEFT SIDE ================= */}
                    <div className="lg:sticky lg:top-24">
                        <div className="relative h-[280px] w-full overflow-hidden rounded-xl sm:h-[400px] md:h-[500px] lg:h-[650px]">
                            <Image
                                src={work.image}
                                alt={work.name}
                                fill
                                priority
                                sizes="(max-width: 1023px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* ================= RIGHT SIDE ================= */}
                    <div className="w-full min-w-0">

                        {/* TITLE */}
                        <h1 className="text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl md:text-4xl">
                            {work.name}
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-[15px]">
                            {work.description}
                        </p>

                        {/* CATEGORY TAGS */}
                        <div className="mt-5 flex flex-wrap gap-2">
                            {work.muscleGroups?.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-[#243b08] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#b8ff00]"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>

                        {/* KEY SPECS */}
                        <WorkoutSpecs work={work} />

                        {/* INSTRUCTIONS */}
                        <Instructions
                            instructions={work.instructions}
                        />

                        {/* ACTION BUTTONS */}
                        <WorkoutActions work={work} />

                    </div>
                </div>
            </div>
        </main>
    );
};

export default WorkoutDetails;