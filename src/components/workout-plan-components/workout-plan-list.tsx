import { useEffect, useState } from "react";

import { WorkoutPlan } from "./workout-plan-card";

import { getUserWorkoutPlans } from "@/api/model-apis/workout-plan-api";

interface WorkoutPlanListProps {
  userId: string;
}

export const WorkoutPlanList: React.FC<WorkoutPlanListProps> = ({ userId }) => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      const data = await getUserWorkoutPlans(userId);

      setWorkoutPlans(data);
    };

    fetchWorkoutPlans();
  }, [userId]);

  return (
    <div className="flex gap-4 overflow-x-auto">
      {workoutPlans.length > 0 ? (
        workoutPlans.map((plan, index) => (
          <WorkoutPlan key={index} workoutPlan={plan} />
        ))
      ) : (
        <p>No workout plans found.</p>
      )}
    </div>
  );
};
