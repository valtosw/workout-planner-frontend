import axios from "./axios";

import { MappedTrainers } from "@/types/trainer";

export const getPostedTrainersList = async () => {
  try {
    const response = await axios.get("/Trainer/posted");

    return MappedTrainers(response.data);
  } catch (error) {
    alert("Failed to fetch trainers list");
    throw error;
  }
};

export const getFilteredTrainers = async (
  experience: string | null,
  minPrice: number,
  maxPrice: number,
  isCertified: boolean | null,
  location: string,
) => {
  try {
    const response = await axios.get("/Trainer/filter", {
      params: {
        experience,
        minPrice,
        maxPrice,
        isCertified,
        location,
      },
    });

    return MappedTrainers(response.data);
  } catch (error) {
    alert(error);
    throw error;
  }
};
