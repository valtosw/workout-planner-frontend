/* eslint-disable prettier/prettier */
import DefaultLayout from "@/layouts/default";
import TrainerBlock from "../components/trainer-block";
import { Trainer } from "../components/trainer-block";

const trainers: Trainer[] = [
    {
        firstName: "John",
        lastName: "Doe",
        photoUrl:
            "https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png",
        experience: "5 years",
        placeOfWork: "Fitness Center A",
        trainingPrice: 50,
        bio: "Passionate about helping people achieve their fitness goals.",
        instagramLink: "https://instagram.com",
        facebookLink: "https://facebook.com",
        telegramLink: "https://web.telegram.org/a/",
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        photoUrl:
            "https://media.istockphoto.com/id/856797530/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D0%BE%D0%B9-%D0%B6%D0%B5%D0%BD%D1%89%D0%B8%D0%BD%D1%8B-%D0%B2-%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%BD%D0%BE%D0%BC-%D0%B7%D0%B0%D0%BB%D0%B5.jpg?s=612x612&w=0&k=20&c=NiW-IRUy7tmL3tI7hUhL3Ke9ucy9q5ke8rKYadKzok0=",
        experience: "3 years",
        placeOfWork: "Gym B",
        trainingPrice: 40,
        bio: "Specialist in weight loss and muscle building.",
        instagramLink: "https://instagram.com",
        facebookLink: "https://facebook.com",
        telegramLink: "https://web.telegram.org/a/",
    },
];

const TrainersPage: React.FC = () => {
  return (
    <DefaultLayout>
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Our Trainers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trainers.map((trainer, index) => (
            <TrainerBlock key={index} trainer={trainer} />
            ))}
        </div>
        </div>
    </DefaultLayout>
  );
};

export default TrainersPage;
