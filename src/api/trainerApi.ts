import axios from "./axios";

import { Trainer } from "@/components/trainer-block";

export const getPostedTrainersList = async () => {
  try {
    const response = await axios.get("/Trainer/posted");

    const mappedTrainers: Trainer[] = response.data.map((trainer: any) => ({
      firstName: trainer.firstName,
      lastName: trainer.lastName,
      photoUrl: trainer.profilePicture,
      experience: trainer.experience,
      location: trainer.location,
      placeOfWork: trainer.placeOfWork,
      trainingPrice: trainer.trainingPrice ?? 0,
      bio: trainer.bio,
      instagramLink: trainer.instagramLink,
      facebookLink: trainer.facebookLink,
      telegramLink: trainer.telegramLink,
    }));

    return mappedTrainers;
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

    return response.data;
  } catch (error) {
    alert(error);
    throw error;
  }
};
