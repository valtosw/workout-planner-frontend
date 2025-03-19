import axios from "../axios";

export const getExerciseListByMuscleGroup = async (muscleGroup: string) => {
  try {
    const response = await axios.get("/Exercise/GetExercisesByMuscleGroup", {
      params: { muscleGroup },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
