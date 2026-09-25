import React from "react";

const Loading = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0d0f12]">
            <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#25282d] border-t-[#b8ff00]" />

                <p className="mt-4 text-sm font-medium text-[#85898f]">
                    Loading workouts…
                </p>
            </div>
        </main>
    );
};

export default Loading;