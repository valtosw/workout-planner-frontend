import { useEffect, useState } from "react";
import { Avatar, Button, Divider, User } from "@heroui/react";

import MuscleRadarChart from "./MuscleRadarChart";
import ExerciseLineChart from "./ExerciseLineChart";

import { Navbar } from "@/components/NavbarComponents/Navbar";
import useAuth from "@/hooks/useAuth";
import { Trainer } from "@/types/trainer";
import { MappedTrainers } from "@/types/trainer";
import axios from "@/api/axios";

const CustomerProfilePage = () => {
  const { user, auth } = useAuth();
  const [trainers, setTrainers] = useState<Trainer[]>([]);

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

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Avatar size="lg" src={user?.profilePicture} />
            <h2 className="text-xl font-semibold">{user?.fullName}</h2>
          </div>
          <Button>Edit Profile</Button>
        </div>
        <Divider className="w-full" />
        <div className="flex h-screen">
          <div className="flex-1 pr-6">
            <h3 className="text-lg font-semibold pb-4">My Statistics</h3>

            <div className="bg-background p-6 rounded-lg">
              <div className="flex gap-6">
                <div className="w-3/5">
                  <ExerciseLineChart userId={auth?.id || ""} />
                </div>

                <div className="w-2/5">
                  <MuscleRadarChart userId={auth?.id || ""} />
                </div>
              </div>
            </div>
          </div>

          <Divider className="h-screen" orientation="vertical" />

          <div className="w-60 pl-6">
            <h3 className="text-lg font-semibold pb-4">My Trainers</h3>
            <div className="flex flex-col space-y-4 items-start">
              {trainers.map((trainer) => (
                <User
                  key={trainer.firstName + trainer.lastName}
                  avatarProps={{ src: trainer.photoUrl }}
                  name={trainer.firstName + " " + trainer.lastName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfilePage;
