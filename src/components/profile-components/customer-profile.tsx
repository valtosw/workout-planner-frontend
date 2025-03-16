import { useState, useEffect } from "react";
import { Button, Card, Select, SelectItem } from "@heroui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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

// export const mockTrainers: Trainer[] = [
//   {
//     firstName: "Alex",
//     lastName: "Carter",
//     photoUrl:
//       "https://i.pinimg.com/736x/ba/e2/d7/bae2d7a50a8a602fe0e71c6b7eb19cef.jpg",
//     experience: "10 years",
//     countryId: 1, // Example: USA
//     city: "New York",
//     placeOfWork: "Iron Gym NYC",
//     trainingPrice: 50,
//     bio: "Certified personal trainer specializing in strength training and weight loss.",
//     instagramLink: "https://instagram.com/alexfit",
//     facebookLink: "https://facebook.com/alexfit",
//     telegramLink: "https://t.me/alexfit",
//   },
//   {
//     firstName: "Sophie",
//     lastName: "Müller",
//     photoUrl:
//       "https://i.pinimg.com/736x/70/e0/95/70e095142199eff445d3827dbb8790cd.jpg",
//     experience: "7 years",
//     countryId: 2, // Example: Germany
//     city: "Berlin",
//     placeOfWork: "Berlin Fitness Club",
//     trainingPrice: 60,
//     bio: "Passionate about functional training and helping clients achieve their goals.",
//     instagramLink: "https://instagram.com/sophie_fitness",
//     facebookLink: "https://facebook.com/sophiefitness",
//     telegramLink: "https://t.me/sophiefitness",
//   },
//   {
//     firstName: "Liam",
//     lastName: "Nguyen",
//     photoUrl:
//       "https://i.pinimg.com/736x/47/1a/68/471a68e5cc4d474c4679fd4cc53b439e.jpg",
//     experience: "5 years",
//     countryId: 3, // Example: Australia
//     city: "Sydney",
//     placeOfWork: "Bondi Strength",
//     trainingPrice: 55,
//     bio: "Specializing in endurance and HIIT workouts. Get ready to sweat!",
//     instagramLink: "https://instagram.com/liamworkout",
//     facebookLink: "https://facebook.com/liamworkout",
//     telegramLink: "https://t.me/liamworkout",
//   },
//   {
//     firstName: "Isabella",
//     lastName: "Rossi",
//     photoUrl:
//       "https://i.pinimg.com/736x/ad/c0/ef/adc0ef203ab30c3ea94bdfd99559fa15.jpg",
//     experience: "8 years",
//     countryId: 4, // Example: Italy
//     city: "Rome",
//     placeOfWork: "Gladiator Gym",
//     trainingPrice: 70,
//     bio: "Helping people achieve their dream physique through customized training plans.",
//     instagramLink: "https://instagram.com/isabella_rossi",
//     facebookLink: "https://facebook.com/isabella_rossi",
//     telegramLink: "https://t.me/isabellarossi",
//   },
//   {
//     firstName: "Daniel",
//     lastName: "Smith",
//     photoUrl:
//       "https://i.pinimg.com/736x/5f/7f/07/5f7f077b3c7008e196030daf2b4a8ee7.jpg",
//     experience: "6 years",
//     countryId: 5, // Example: Canada
//     city: "Toronto",
//     placeOfWork: "Peak Performance Gym",
//     trainingPrice: 65,
//     bio: "Expert in CrossFit and functional movement. Let's push your limits!",
//     instagramLink: "https://instagram.com/danieltrainer",
//     facebookLink: "https://facebook.com/danieltrainer",
//     telegramLink: "https://t.me/danieltrainer",
//   },
//   {
//     firstName: "Max",
//     lastName: "Kool",
//     photoUrl:
//       "https://i.pinimg.com/736x/48/86/29/4886292861e9c1c7a4fc804cbf058a06.jpg",
//     experience: "6 years",
//     countryId: 5, // Example: Canada
//     city: "Toronto",
//     placeOfWork: "Peak Performance Gym",
//     trainingPrice: 65,
//     bio: "Expert in CrossFit and functional movement. Let's push your limits!",
//     instagramLink: "https://instagram.com/danieltrainer",
//     facebookLink: "https://facebook.com/danieltrainer",
//     telegramLink: "https://t.me/danieltrainer",
//   },
//   {
//     firstName: "Sofia",
//     lastName: "Pets",
//     photoUrl:
//       "https://i.pinimg.com/736x/66/1a/9a/661a9a225c4db0e1313c68d62016998c.jpg",
//     experience: "6 years",
//     countryId: 5, // Example: Canada
//     city: "Toronto",
//     placeOfWork: "Peak Performance Gym",
//     trainingPrice: 65,
//     bio: "Expert in CrossFit and functional movement. Let's push your limits!",
//     instagramLink: "https://instagram.com/danieltrainer",
//     facebookLink: "https://facebook.com/danieltrainer",
//     telegramLink: "https://t.me/danieltrainer",
//   },
//   {
//     firstName: "Michael",
//     lastName: "Bowers",
//     photoUrl:
//       "https://i.pinimg.com/736x/88/11/1d/88111de85323ca75ea55b2b8bd6b4e5d.jpg",
//     experience: "6 years",
//     countryId: 5, // Example: Canada
//     city: "Toronto",
//     placeOfWork: "Peak Performance Gym",
//     trainingPrice: 65,
//     bio: "Expert in CrossFit and functional movement. Let's push your limits!",
//     instagramLink: "https://instagram.com/danieltrainer",
//     facebookLink: "https://facebook.com/danieltrainer",
//     telegramLink: "https://t.me/danieltrainer",
//   },
// ];

const ITEMS_PER_PAGE = 5;

export const CustomerProfilePage = () => {
  const { user, auth } = useAuth();
  const [exercises, setExercises] = useState(mockExercises);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          `/Customer/PersonalTrainers/${auth?.id}`,
        );

        setTrainers(MappedTrainers(response.data));
        console.log(trainers);
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (selectedExercise) {
      setChartData([
        { name: "Week 1", value: Math.random() * 100 },
        { name: "Week 2", value: Math.random() * 100 },
        { name: "Week 3", value: Math.random() * 100 },
        { name: "Week 4", value: Math.random() * 100 },
      ]);
    }
  }, [selectedExercise]);

  return (
    <>
      <Navbar />
      <div className="flex w-full h-screen p-4 gap-4 ">
        {/* Profile Sidebar */}
        <Card className="w-1/6 h-full p-4 bg-background flex flex-col items-center border border-default-200 dark:border-default-100 rounded-lg">
          <Card className="w-full rounded-lg border border-default-200 dark:border-default-100 flex items-center justify-center overflow-hidden mb-4">
            {user?.profilePicture ? (
              <img
                alt={user.fullName}
                className="w-full h-full object-cover rounded-lg"
                src={user.profilePicture}
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </Card>
          <p className="text-lg font-semibold">{user?.fullName}</p>
          <p className="text-sm text-gray-500">{auth?.email}</p>
          <div className="mt-auto w-full flex flex-col gap-2">
            <Button className="w-full">Edit Profile</Button>
            <Button className="w-full bg-red-500 text-white">
              Delete Account
            </Button>
          </div>
        </Card>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4 h-screen">
          {/* Exercise Selector & Chart */}
          <div className="h-2/3 p-4 bg-background shadow rounded-lg">
            <h2 className="text-lg font-semibold">My Statistics</h2>
            <div className="flex gap-4 mt-4">
              {/* Left Side: Selector + Chart */}
              <div className="w-2/3">
                <Select
                  className="mb-4 w-1/3"
                  value={selectedExercise}
                  onChange={(e) => setSelectedExercise(e.target.value)}
                >
                  {exercises.map((exercise) => (
                    <SelectItem key={exercise.id}>{exercise.name}</SelectItem>
                  ))}
                </Select>
                <ResponsiveContainer height={250} width="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* My Trainers Section */}
          <div className="p-4 bg-background shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-4">My Trainers</h2>
            <div
              className={`flex gap-4 overflow-x-auto ${
                displayedTrainers.length === 5
                  ? "justify-center"
                  : "justify-start"
              }`}
            >
              {displayedTrainers.map((trainer) => (
                <TrainerBlockInCustomerProfile
                  key={trainer.firstName}
                  trainer={trainer}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button isDisabled={currentPage === 1} onPress={handlePrevPage}>
                ← Previous
              </Button>
              <Button
                isDisabled={currentPage === totalPages}
                onPress={handleNextPage}
              >
                Next →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
