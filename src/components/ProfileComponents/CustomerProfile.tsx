import { useEffect, useState } from "react";
import { Avatar, Button, Divider, User } from "@heroui/react";

import MuscleRadarChart from "./MuscleRadarChart";
import ExerciseLineChart from "./ExerciseLineChart";

import { TrainerProfileModal } from "@/components/TrainerComponents/TrainerModal";
import { Navbar } from "@/components/NavbarComponents/Navbar";
import useAuth from "@/hooks/useAuth";
import { Trainer } from "@/types/trainer";
import { MappedTrainers } from "@/types/trainer";
import axios from "@/api/axios";
import DefaultLayout from "@/layouts/Default";

const CustomerProfilePage = () => {
  const { user, auth } = useAuth();
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          `/Customer/PersonalTrainers/${auth?.id}`,
        );
        setTrainers(MappedTrainers(response.data));
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchTrainers();
  }, [auth?.id]);

  const handleTrainerClick = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  return (
    <DefaultLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Avatar size="lg" src={user?.profilePicture} />
            <h2 className="text-xl font-semibold">{user?.fullName}</h2>
          </div>
          <Button>Edit Profile</Button>
        </div>
        <Divider className="w-full" />
        <div className="flex" style={{ height: "calc(100vh - 180px)" }}>
          <div className="flex-1 pr-6">
            <h3 className="text-lg font-semibold pb-4">My Statistics</h3>
            <div className="bg-background p-6 rounded-lg h-full">
              <div className="flex gap-6 h-full">
                <div className="w-3/5">
                  <ExerciseLineChart userId={auth?.id || ""} />
                </div>
                <div className="w-2/5">
                  <MuscleRadarChart userId={auth?.id || ""} />
                </div>
              </div>
            </div>
          </div>

          <Divider className="h-full" orientation="vertical" />

          <div className="w-60 pl-6 flex flex-col">
            <h3 className="text-lg font-semibold pb-4">My Trainers</h3>
            <div className="flex-1 overflow-y-auto pr-2">
              {trainers.map((trainer) => (
                <div
                  key={`${trainer.firstName}-${trainer.lastName}`}
                  className="mb-4 last:mb-0"
                >
                  <button
                    className="w-full text-left"
                    onClick={() => handleTrainerClick(trainer)}
                  >
                    <User
                      avatarProps={{
                        src: trainer.photoUrl,
                        className: "hover:opacity-80 transition-opacity",
                      }}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 w-full flex items-center"
                      name={trainer.firstName + " " + trainer.lastName}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedTrainer && (
        <TrainerProfileModal
          isOpen={isModalOpen}
          trainer={selectedTrainer}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </DefaultLayout>
  );
};

export default CustomerProfilePage;