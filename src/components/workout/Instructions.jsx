import React from "react";

const Instructions = ({ instructions = [] }) => {
    return (
        <section className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Instructions
            </h2>

            <ol className="mt-4 space-y-4">
                {instructions.map((instruction, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 text-sm leading-6 text-gray-400"
                    >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#242830] text-xs font-bold text-[#b8ff00]">
                            {index + 1}
                        </span>

                        <span className="min-w-0 flex-1">
                            {instruction}
                        </span>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default Instructions;