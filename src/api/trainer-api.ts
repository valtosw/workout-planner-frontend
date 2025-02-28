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
  country: string | null,
  city: string | null,
) => {
  try {
    const response = await axios.get("/Trainer/Filtered", {
      params: {
        experience,
        minPrice,
        maxPrice,
        isCertified,
        country,
        city,
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

export const getMaxExperience = async () => {
  try {
    const response = await axios.get("/Trainer/MaxExperience");

    return response.data;
  } catch (error) {
    throw error;
  }
};
