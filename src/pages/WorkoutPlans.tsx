import { Spacer } from "@heroui/react";

import DefaultLayout from "@/layouts/Default";
import { CreateWorkoutPlanCard } from "@/components/WorkoutPlanComponents/CreateWorkoutPlanCard";
import { WorkoutPlanList } from "@/components/WorkoutPlanComponents/WorkoutPlanList";
import useAuth from "@/hooks/useAuth";

const WorkoutPlansPage: React.FC = () => {
  const { auth } = useAuth();

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900 dark:text-gray-100 mb-4">
        Your Workout Plans
      </h1>
      <div className="h-full flex items-start ">
        <CreateWorkoutPlanCard />
        <Spacer x={4} />

        <WorkoutPlanList userId={auth?.id} />
      </div>
    </DefaultLayout>
  );
};

export default WorkoutPlansPage;
