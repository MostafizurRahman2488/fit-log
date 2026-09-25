import React from "react";

const WorkoutSpecs = ({ work }) => {
    const specs = [
        {
            label: "Equipment",
            value: work.equipment,
        },
        {
            label: "Difficulty",
            value: work.difficulty,
        },
        {
            label: "Sets",
            value: work.sets,
        },
        {
            label: "Reps",
            value: work.reps,
        },
        {
            label: "Duration",
            value: `${work.duration} min`,
        },
        {
            label: "Calories",
            value: `${work.caloriesBurned} kcal`,
        },
        {
            label: "Rating",
            value: work.rating,
        },
    ];

    return (
        <div className="mt-6 w-full overflow-hidden rounded-xl border border-[#242830] bg-[#15181e]">
            {specs.map((spec, index) => (
                <div
                    key={spec.label}
                    className={`flex items-center justify-between gap-4 px-4 py-3 ${
                        index !== specs.length - 1
                            ? "border-b border-[#242830]"
                            : ""
                    }`}
                >
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                        {spec.label}
                    </span>

                    <span className="text-right text-xs text-gray-300">
                        {spec.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default WorkoutSpecs;