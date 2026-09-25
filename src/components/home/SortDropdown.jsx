"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const SortDropdown = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);

    const options = [
        { value: "duration", label: "Duration" },
        { value: "calories", label: "Calories" },
        { value: "rating", label: "Rating" },
    ];

    const selectedOption = options.find(
        (option) => option.value === value
    );

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex min-w-[160px] items-center justify-between gap-4 rounded-lg border border-gray-700 bg-[#15171c] px-4 py-2.5 text-sm text-white"
            >
                <span>
                    Sort By:{" "}
                    <span className="text-lime-400">
                        {selectedOption?.label}
                    </span>
                </span>

                <FaChevronDown
                    className={`text-xs transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-full min-w-[160px] overflow-hidden rounded-lg border border-gray-700 bg-[#15171c]">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                            className="block w-full px-4 py-2.5 text-left text-sm text-white hover:bg-lime-950 hover:text-lime-400"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;