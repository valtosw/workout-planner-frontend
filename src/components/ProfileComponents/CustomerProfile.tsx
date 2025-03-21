import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Select,
  SelectItem,
  User,
} from "@heroui/react";

import { Navbar } from "@/components/NavbarComponents/Navbar";
import useAuth from "@/hooks/useAuth";
import { Trainer } from "@/types/trainer";
import { MappedTrainers } from "@/types/trainer";
import axios from "@/api/axios";

const exercises = ["Bench Press", "Squat", "Deadlift", "Pull-Up"];
const muscleGroups = [
  { muscle: "Chest", frequency: 10 },
  { muscle: "Legs", frequency: 15 },
  { muscle: "Back", frequency: 12 },
  { muscle: "Arms", frequency: 8 },
  { muscle: "Shoulders", frequency: 7 },
];

const CustomerProfilePage = () => {
  const { user, auth } = useAuth();
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [radarData, setRadarData] = useState<
    { subject: string; value: number }[]
  >([]);

  const [selectedExercise, setSelectedExercise] = useState("");
  const weightProgress = selectedExercise
    ? [
        { date: "Jan", weight: 50 },
        { date: "Feb", weight: 55 },
        { date: "Mar", weight: 60 },
        { date: "Apr", weight: 65 },
      ]
    : [];

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
          {/* Statistics Section - Takes 3/4 of the width */}
          <div className="flex-1 pr-6">
            <h3 className="text-lg font-semibold">My Statistics</h3>
            <div className="grid grid-cols-3 gap-6 h-full">
              {/* Line Chart - 2/3 width */}
              <div className="col-span-2 p-4 bg-gray-100 rounded-xl">
                <Select
                  label="Select Exercise"
                  onChange={(e) => setSelectedExercise(e.target.value)}
                >
                  {exercises.map((exercise) => (
                    <SelectItem key={exercise}>{exercise}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <Divider className="h-screen" orientation="vertical" />

          {/* Trainers Section - Takes 1/4 of the width */}
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
