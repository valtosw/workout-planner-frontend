import axios from "./axios";

import { MappedTrainers } from "@/types/trainer";

export const getPostedTrainersList = async () => {
  try {
    const response = await axios.get("/Trainer/Posted");

    return MappedTrainers(response.data);
  } catch (error) {
    throw error;
  }
};

export const getFilteredTrainers = async (
  experience: number | null,
  minPrice: number,
  maxPrice: number,
  isCertified: boolean | null,
  location: string,
) => {
  try {
    const response = await axios.get("/Trainer/Filtered", {
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
    throw error;
  }
};

export const getMaxTrainingPrice = async () => {
  try {
    const response = await axios.get("/Trainer/MaxPrice");

    return response.data;
  } catch (error) {
    throw error;
  }
};
