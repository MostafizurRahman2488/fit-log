const getWorkout = async (id) => {
    const res = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`
    );

    return res.json();
};

const WorkoutsDetailPage = async ({ params }) => {
    const { id } = await params;

    const workout = await getWorkout(id);

    return (
        <div>
            <h1>Workout ID: {id}</h1>

            <h2>{workout.name}</h2>
            <p>{workout.description}</p>
        </div>
    );
};

export default WorkoutsDetailPage;