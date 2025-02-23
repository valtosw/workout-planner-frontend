export interface Trainer {
  firstName: string;
  lastName: string;
  photoUrl: string;
  experience?: string;
  location?: string;
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
    location: trainer.location,
    placeOfWork: trainer.placeOfWork,
    trainingPrice: trainer.trainingPrice ?? 0,
    bio: trainer.bio,
    instagramLink: trainer.instagramLink,
    facebookLink: trainer.facebookLink,
    telegramLink: trainer.telegramLink,
  }));
};
