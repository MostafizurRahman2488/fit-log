import React from "react";
import { Dumbbell, Clock3, Flame } from "lucide-react";

const MetricksSummery = ({
    exercises = 0,
    minutes = 0,
    calories = 0,
}) => {
    const metrics = [
        {
            label: "Exercises",
            value: exercises,
            icon: Dumbbell,
        },
        {
            label: "Minutes",
            value: minutes,
            icon: Clock3,
        },
        {
            label: "Calories",
            value: calories,
            icon: Flame,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                    <div
                        key={metric.label}
                        className="rounded-xl border border-[#25282d] bg-[#15171c] p-5"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#85898f]">
                                {metric.label}
                            </p>

                            <Icon
                                size={17}
                                className="text-[#b8ff00]"
                            />
                        </div>

                        <p className="mt-3 text-3xl font-extrabold text-white">
                            {metric.value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default MetricksSummery;