export interface Trainer {
  firstName: string;
  lastName: string;
  photoUrl: string;
  experience?: string;
  countryId: number;
  city?: string;
  placeOfWork?: string;
  trainingPrice: number;
  bio?: string;
  instagramLink?: string;
  facebookLink?: string;
  telegramLink?: string;
}

export interface TrainerBlockProps {
  trainer: Trainer;
}

export interface FilterProps {
  onFilter: (filters: any) => void;
}

export const MappedTrainers = (data: any[]): Trainer[] => {
  return data.map((trainer) => ({
    firstName: trainer.firstName,
    lastName: trainer.lastName,
    photoUrl: trainer.profilePicture,
    experience: trainer.experience,
    countryId: trainer.countryId,
    city: trainer.city,
    placeOfWork: trainer.placeOfWork,
    trainingPrice: trainer.trainingPrice ?? 0,
    bio: trainer.bio,
    instagramLink: trainer.instagramLink,
    facebookLink: trainer.facebookLink,
    telegramLink: trainer.telegramLink,
  }));
};
