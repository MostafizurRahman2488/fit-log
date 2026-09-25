import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0d0f12] px-4">
            <div className="w-full max-w-md text-center">

                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b8ff00]">
                    FitLog
                </p>

                <h1 className="mt-4 text-6xl font-extrabold text-white">
                    404
                </h1>

                <h2 className="mt-3 text-xl font-bold uppercase text-white">
                    Workout Not Found
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#85898f]">
                    Sorry, the workout or page you are looking for
                    could not be found.
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#b8ff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#c8ff3d]"
                >
                    <ArrowLeft size={16} />
                    Back to Workouts
                </Link>

            </div>
        </main>
    );
};

export default NotFound;