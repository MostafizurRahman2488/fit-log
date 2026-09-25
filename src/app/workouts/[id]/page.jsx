import WorkoutDetails from "@/components/workout/WorkoutDetails";
import { notFound } from "next/navigation";

const getWorkout = async (id) => {
    const res = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`,
        {
            next: {
                revalidate: 60,
            },
        }
    );

    if (!res.ok) {
        notFound();
    }

    return res.json();
};

const WorkoutsDetailPage = async ({ params }) => {
    const { id } = await params;

    const work = await getWorkout(id);

    return <WorkoutDetails work={work} />;
};

export default WorkoutsDetailPage;