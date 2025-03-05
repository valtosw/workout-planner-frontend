import { Spacer } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { CreateWorkoutPlanCard } from "@/components/workout-plan-components/create-workout-plan";
import { WorkoutPlanList } from "@/components/workout-plan-components/workout-plan-list";
import useAuth from "@/hooks/useAuth";

const WorkoutPlansPage: React.FC = () => {
  const { auth } = useAuth();

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900 dark:text-gray-100 mb-4">
        Your Workout Plans
      </h1>
      <div className="h-full flex items-start min-h-screen ">
        <CreateWorkoutPlanCard />
        <Spacer x={4} />

        <WorkoutPlanList userId={auth?.id} />
      </div>
    </DefaultLayout>
  );
};

export default WorkoutPlansPage;
