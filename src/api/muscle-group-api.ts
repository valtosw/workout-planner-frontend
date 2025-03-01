import axios from "./axios";

export const getMuscleGroupList = async () => {
  try {
    const response = await axios.get("/MuscleGroup/AllMuscleGroups");

    return response.data;
  } catch (error) {
    throw error;
  }
};
