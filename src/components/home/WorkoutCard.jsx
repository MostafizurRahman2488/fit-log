import React from "react";
import Image from "next/image";
import { FaClock, FaFire, FaStar } from "react-icons/fa";

const WorkoutCard = ({ work }) => {
    return (
        <article className="group overflow-hidden rounded-xl border border-[#25282d] bg-[#15171c] transition duration-300 hover:-translate-y-1 hover:border-[#b8ff00]/40 hover:shadow-lg">

            
            {/* Image */}
            <figure className="relative h-48 w-full overflow-hidden bg-[#101216]">
                <Image
                    src={work.image}
                    alt={work.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Rating */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    <FaStar className="text-[#b8ff00]" />
                    {work.rating}
                </div>
            </figure>
           


            {/* Content */}
            <div className="p-4 sm:p-5">

                {/* Muscle Groups */}
                {work.muscleGroups?.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1.5">
                        {work.muscleGroups.map((muscle) => (
                            <span
                                key={muscle}
                                className="rounded-full bg-[#243b08] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#b8ff00]"
                            >
                                {muscle}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h2 className="line-clamp-1 text-base font-bold uppercase tracking-wide text-white">
                    {work.name}
                </h2>

                {/* Equipment */}
                <p className="mt-1 line-clamp-1 text-xs text-[#85898f]">
                    {work.equipment}
                </p>

                {/* Divider */}
                <div className="my-4 border-t border-[#25282d]" />

                {/* Workout Info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#85898f]">

                    <span className="flex items-center gap-1.5">
                        <FaClock className="text-[#b8ff00]" />
                        {work.duration} min
                    </span>

                    <span className="flex items-center gap-1.5">
                        <FaFire className="text-[#b8ff00]" />
                        {work.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1.5">
                        <FaStar className="text-[#b8ff00]" />
                        {work.rating}
                    </span>

                </div>
            </div>
        </article>
    );
};

export default WorkoutCard;