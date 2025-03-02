import { useEffect } from "react";

import DefaultLayout from "@/layouts/default";
import { CreateWorkoutPlanCard } from "@/components/workout-plan-components/create-workout-plan";

const WorkoutPlansPage: React.FC = () => {
  return (
    <DefaultLayout>
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900 dark:text-gray-100 mb-4">
        Your Workout Plans
      </h1>
      <div className="h-full flex items-start min-h-screen ">
        <CreateWorkoutPlanCard />
      </div>
    </DefaultLayout>
  );
};

export default WorkoutPlansPage;
