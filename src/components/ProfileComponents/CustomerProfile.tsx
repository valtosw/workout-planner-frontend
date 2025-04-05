import { useEffect, useState } from "react";
import { Avatar, Button, Card, Divider, Image } from "@heroui/react";

import MuscleRadarChart from "./MuscleRadarChart";
import ExerciseLineChart from "./ExerciseLineChart";
import { EditProfileModal } from "./EditProfileModal";

import { TrainerProfileModal } from "@/components/TrainerComponents/TrainerModal";
import useAuth from "@/hooks/useAuth";
import { Trainer } from "@/types/trainer";
import { MappedTrainers } from "@/types/trainer";
import axios from "@/api/axios";
import DefaultLayout from "@/layouts/Default";

const CustomerProfilePage = () => {
  const { user, auth } = useAuth();
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [firstName, lastName] = (user?.fullName || "").split(" ");

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
    setIsTrainerModalOpen(true);
  };

  const handleSaveProfile = async (formData: FormData) => {};

  return (
    <DefaultLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Avatar size="lg" src={user?.profilePicture} />
            <h2 className="text-xl font-semibold">{user?.fullName}</h2>
          </div>
          <Button onPress={() => setIsEditProfileModalOpen(true)}>
            Edit Profile
          </Button>
        </div>
        <Divider className="w-full" />
        <div className="flex" style={{ height: "calc(100vh - 180px)" }}>
          <div className="flex-1 pr-6">
            <h3 className="text-2xl font-semibold tracking-wide text-gray-900 dark:text-gray-100">
              My Statistics
            </h3>
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
            <div className="flex-1 overflow-y-auto pr-2 bg-background">
              <div className="flex flex-col gap-2 bg-background">
                {trainers.map((trainer) => (
                  <Card
                    key={`${trainer.firstName}-${trainer.lastName}`}
                    isPressable
                    className="w-full text-left bg-background p-1 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onPress={() => handleTrainerClick(trainer)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Image
                        alt={trainer.firstName}
                        className="w-12 h-12 hover:opacity-80 transition-opacity"
                        src={trainer.photoUrl}
                      />
                      <span className="text-sm font-medium">
                        {trainer.firstName + " " + trainer.lastName}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedTrainer && (
        <TrainerProfileModal
          isOpen={isTrainerModalOpen}
          trainer={selectedTrainer}
          onClose={() => setIsTrainerModalOpen(false)}
        />
      )}

      {user && (
        <EditProfileModal
          currentUser={{
            firstName: firstName,
            lastName: lastName,
            profilePictureUrl: user.profilePicture,
          }}
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </DefaultLayout>
  );
};

export default CustomerProfilePage;
