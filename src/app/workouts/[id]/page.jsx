import Image from "next/image";

const getWorkout = async (id) => {
    const res = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch workout");
    }

    return res.json();
};

const WorkoutsDetailPage = async ({ params }) => {
    const { id } = await params;

    const work = await getWorkout(id);

    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-[#0d0f12] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">

            {/* MAIN CONTAINER */}
            <div className="mx-auto w-full max-w-[1200px]">

                {/* ================= IMAGE ================= */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">

                    <div>
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

                    {/* ================= DETAILS ================= */}
                    <div className="w-full min-w-0">

                        {/* TITLE */}
                        <h1 className="text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl md:text-4xl">
                            {work.name}
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-[15px]">
                            {work.description}
                        </p>

                        {/* MUSCLE GROUPS */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {work.muscleGroups?.map((muscle, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-lime-400 px-3 py-1 text-[11px] font-bold text-black sm:text-xs"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>

                        {/* ================= INFO BOX ================= */}
                        <div className="mt-5 w-full overflow-hidden rounded-xl border border-[#242830] bg-[#15181e]">

                            {/* Equipment */}
                            <div className="flex items-center justify-between gap-4 border-b border-[#242830] px-4 py-3">
                                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Equipment
                                </span>

                                <span className="text-right text-xs text-gray-300">
                                    {work.equipment}
                                </span>
                            </div>

                            {/* Difficulty */}
                            <div className="flex items-center justify-between gap-4 border-b border-[#242830] px-4 py-3">
                                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Difficulty
                                </span>

                                <span className="text-right text-xs text-gray-300">
                                    {work.difficulty}
                                </span>
                            </div>

                            {/* Sets */}
                            <div className="flex items-center justify-between gap-4 border-b border-[#242830] px-4 py-3">
                                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Sets
                                </span>

                                <span className="text-right text-xs text-gray-300">
                                    {work.sets}
                                </span>
                            </div>

                            {/* Reps */}
                            <div className="flex items-center justify-between gap-4 border-b border-[#242830] px-4 py-3">
                                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Reps
                                </span>

                                <span className="text-right text-xs text-gray-300">
                                    {work.reps}
                                </span>
                            </div>

                            {/* Duration */}
                            <div className="flex items-center justify-between gap-4 border-b border-[#242830] px-4 py-3">
                                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Duration
                                </span>

                                <span className="text-right text-xs text-gray-300">
                                    {work.duration} min
                                </span>
                            </div>

                            {/* Calories */}
                            <div className="flex items-center justify-between gap-4 border-b border-[#242830] px-4 py-3">
                                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Calories
                                </span>

                                <span className="text-right text-xs text-gray-300">
                                    {work.caloriesBurned} kcal
                                </span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center justify-between gap-4 px-4 py-3">
                                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Rating
                                </span>

                                <span className="text-right text-xs text-gray-300">
                                    {work.rating}
                                </span>
                            </div>
                        </div>

                        {/* =================================================
                            INSTRUCTIONS
                        ================================================= */}
                        <div className="mt-7 w-full">

                            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                                Instructions
                            </h2>

                            <ol className="mt-4 space-y-3">
                                {work.instructions?.map((instruction, index) => (
                                    <li
                                        key={index}
                                        className="flex w-full items-start gap-3 text-sm leading-6 text-gray-400"
                                    >
                                        <span className="w-5 shrink-0 text-gray-500">
                                            {index + 1}.
                                        </span>

                                        <span className="min-w-0 flex-1 break-words">
                                            {instruction}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* =================================================
                            BUTTONS
                        ================================================= */}
                        <div className="mt-7 flex w-full flex-col gap-3 pb-8 sm:flex-row">

                            <button
                                type="button"
                                className="w-full rounded-lg bg-lime-400 px-5 py-3 text-xs font-bold text-black transition hover:bg-lime-300 sm:w-auto"
                            >
                                🔒 Add to today's plan
                            </button>

                            <button
                                type="button"
                                className="w-full rounded-lg border border-[#30343c] bg-transparent px-5 py-3 text-xs font-medium text-gray-300 transition hover:bg-[#191c21] sm:w-auto"
                            >
                                ♡ Save for later
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default WorkoutsDetailPage;