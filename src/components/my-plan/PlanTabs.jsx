"use client";

import React from "react";

const PlanTabs = ({
    activeTab,
    setActiveTab,
    planCount,
    savedCount,
}) => {
    return (
        <div className="mt-7 flex w-fit rounded-lg border border-[#25282d] bg-[#15171c] p-1">
            <button
                type="button"
                onClick={() => setActiveTab("today")}
                className={`rounded-md px-5 py-2.5 text-xs font-semibold transition ${
                    activeTab === "today"
                        ? "bg-[#b8ff00] text-black"
                        : "text-[#85898f] hover:text-white"
                }`}
            >
                Today's Plan
                <span className="ml-2">
                    {planCount}
                </span>
            </button>

            <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`rounded-md px-5 py-2.5 text-xs font-semibold transition ${
                    activeTab === "saved"
                        ? "bg-[#b8ff00] text-black"
                        : "text-[#85898f] hover:text-white"
                }`}
            >
                Saved
                <span className="ml-2">
                    {savedCount}
                </span>
            </button>
        </div>
    );
};

export default PlanTabs;