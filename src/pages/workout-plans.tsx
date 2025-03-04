import { Spacer } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { CreateWorkoutPlanCard } from "@/components/workout-plan-components/create-workout-plan";
import { WorkoutPlanList } from "@/components/workout-plan-components/workout-plan-list";

const WorkoutPlansPage: React.FC = () => {
  return (
    <DefaultLayout>
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900 dark:text-gray-100 mb-4">
        Your Workout Plans
      </h1>
      <div className="h-full flex items-start min-h-screen ">
        <CreateWorkoutPlanCard />
        <Spacer x={4} />

        <WorkoutPlanList userId="08d2316e-f7a8-11ef-a1a6-98fa9b267c16" />
      </div>
    </DefaultLayout>
  );
};

export default WorkoutPlansPage;
