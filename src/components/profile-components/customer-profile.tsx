import { useState, useEffect } from "react";
import { Button, Card, Select, SelectItem } from "@heroui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import { TrainerBlockInCustomerProfile } from "../trainer-components/trainer-block-in-customer-profile";

import { Navbar } from "@/components/navbar-components/navbar";
import useAuth from "@/hooks/useAuth";
import { Trainer } from "@/types/trainer";
import { MappedTrainers } from "@/types/trainer";
import axios from "@/api/axios";

const mockExercises = [
  { id: 1, name: "Squats" },
  { id: 2, name: "Bench Press" },
  { id: 3, name: "Deadlift" },
  { id: 4, name: "Pull-ups" },
];

const ITEMS_PER_PAGE = 5;

export const CustomerProfilePage = () => {
  const { user, auth } = useAuth();
  const [exercises, setExercises] = useState(mockExercises);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    [],
  );
  const [radarData, setRadarData] = useState<
    { subject: string; value: number }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(trainers.length / ITEMS_PER_PAGE);
  const displayedTrainers = trainers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    if (selectedExercise) {
      setChartData([
        { name: "Week 1", value: Math.random() * 100 },
        { name: "Week 2", value: Math.random() * 100 },
        { name: "Week 3", value: Math.random() * 100 },
        { name: "Week 4", value: Math.random() * 100 },
      ]);
      setRadarData([
        { subject: "Strength", value: Math.random() * 100 },
        { subject: "Endurance", value: Math.random() * 100 },
        { subject: "Flexibility", value: Math.random() * 100 },
        { subject: "Agility", value: Math.random() * 100 },
      ]);
    }
  }, [selectedExercise]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full min-h-screen bg-background text-foreground p-6">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
          {/* Profile Section */}
          <Card className="w-full lg:w-1/4 p-6 bg-background border border-default-200 dark:border-default-100 shadow-lg rounded-xl flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-foreground">
              {user?.profilePicture ? (
                <img
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                  src={user.profilePicture}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300">
                  No Image
                </div>
              )}
            </div>
            <p className="text-xl font-semibold mt-4">{user?.fullName}</p>
            <p className="text-sm text-gray-500">{auth?.email}</p>
            <div className="mt-4 w-full flex flex-col gap-2">
              <Button className="w-full">Edit Profile</Button>
              <Button className="w-full bg-red-600 text-white">
                Delete Account
              </Button>
            </div>
          </Card>

          {/* Statistics Section */}
          <Card className="flex-1 p-6 bg-background border border-default-200 dark:border-default-100 shadow-lg rounded-xl">
            <h2 className="text-lg font-semibold mb-4">My Statistics</h2>
            <Select
              className="mb-4 w-1/2"
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
            >
              {exercises.map((exercise) => (
                <SelectItem key={exercise.id}>{exercise.name}</SelectItem>
              ))}
            </Select>
            <div className="flex gap-6">
              <ResponsiveContainer height={250} width="50%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <ResponsiveContainer height={250} width="50%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  data={radarData}
                  outerRadius="80%"
                >
                  <PolarGrid stroke="#ccc" />
                  <PolarAngleAxis dataKey="subject" stroke="#fff" />
                  <PolarRadiusAxis stroke="#ccc" />
                  <Radar
                    dataKey="value"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Performance"
                    stroke="#3b82f6"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        <Card className="w-full max-w-6xl p-6 mt-6 bg-background border border-default-200 dark:border-default-100 shadow-lg rounded-xl">
          <h2 className="text-lg font-semibold mb-4">My Trainers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {displayedTrainers.map((trainer, index) => (
              <TrainerBlockInCustomerProfile key={index} trainer={trainer} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              disabled={currentPage === 1}
              onPress={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onPress={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};
