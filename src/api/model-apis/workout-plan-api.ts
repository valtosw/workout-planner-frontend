import axios from "../axios";

export const getUserWorkoutPlans = async (id: string) => {
  try {
    const response = await axios.get(`/WorkoutPlan/UserWorkoutPlans/${id}`);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
