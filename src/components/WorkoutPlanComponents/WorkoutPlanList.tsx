import { useEffect, useState } from "react";

import { WorkoutPlan } from "./WorkoutPlanCard";

import { getUserWorkoutPlans } from "@/api/ModelApis/WorkoutPlanApi";

interface WorkoutPlanListProps {
  userId: string | undefined;
}

export const WorkoutPlanList: React.FC<WorkoutPlanListProps> = ({ userId }) => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);

  const handleDeleteWorkoutPlan = (id: number) => {
    setWorkoutPlans((prev) => prev.filter((plan) => plan.id !== id));
  };

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      const data = await getUserWorkoutPlans(userId || "");

      setWorkoutPlans(data);
    };

    fetchWorkoutPlans();
  }, [userId]);

  return (
    <div className="flex gap-4 overflow-x-auto">
      {workoutPlans.length > 0 ? (
        workoutPlans.map((plan, index) => (
          <WorkoutPlan
            key={index}
            workoutPlan={plan}
            onDelete={handleDeleteWorkoutPlan}
          />
        ))
      ) : (
        <p>No workout plans found.</p>
      )}
    </div>
  );
};
