import Hero from "@/components/home/Hero";
import Library from "@/components/home/Library";

const getWorkouts = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
};

const page = async () => {
  const workouts = await getWorkouts();

  return (
    <div>
      <Hero />
      <Library initialWorkouts={workouts} />
    </div>
  );
};

export default page;