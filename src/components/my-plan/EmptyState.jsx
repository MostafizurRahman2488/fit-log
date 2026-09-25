import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

const EmptyState = ({ activeTab }) => {
    const isToday = activeTab === "today";

    return (
        <div className="mt-5 flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-[#25282d] bg-[#101216] px-5">
            <div className="text-center">

                <h2 className="text-lg font-extrabold uppercase tracking-wide text-white">
                    NOTHING HERE YET
                </h2>

                <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#85898f]">
                    {isToday
                        ? "Browse the library and add a lift to get today moving."
                        : "Save a workout from the library and it will appear here."}
                </p>

                <Link
                    href="/"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#b8ff00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#c8ff3d]"
                >
                    Go to workouts
                    <ArrowRight size={14} />
                </Link>

            </div>
        </div>
    );
};

export default EmptyState;