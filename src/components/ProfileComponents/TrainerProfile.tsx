import { useEffect, useState } from "react";
import { Avatar, Button, Divider, Card, Image, Tooltip } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

import { InfoIcon } from "../icons";

import MuscleRadarChart from "./MuscleRadarChart";
import ExerciseLineChart from "./ExerciseLineChart";

import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import DefaultLayout from "@/layouts/Default";
import { ROUTES } from "@/constants/Routes";

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface TrainerInfo {
  firstName: string;
  lastName: string;
  profilePicture: string;
  experience?: number;
  country?: string;
  city?: string;
  placeOfWork?: string;
  trainingPrice?: number;
  bio?: string;
  instagramLink?: string;
  facebookLink?: string;
  telegramLink?: string;
  isPosted: boolean;
}

const TrainerProfilePage = () => {
  const { user, auth } = useAuth();
  const [trainerInfo, setTrainerInfo] = useState<TrainerInfo | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `/Trainer/PersonalCustomers/${auth?.id}`,
        );

        setCustomers(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, [auth?.id]);

  useEffect(() => {
    const fetchTrainerInfo = async () => {
      try {
        const response = await axios.get(`/Trainer/${auth?.id}`);

        setTrainerInfo(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchTrainerInfo();
  }, [auth?.id]);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleUpdatePost = async () => {
    try {
      const response = await axios.put(`/Trainer/UpdatePost/${auth?.id}`);

      setTrainerInfo(response.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Avatar size="lg" src={user?.profilePicture} />
            <h2 className="text-xl font-semibold">{user?.fullName}</h2>
            <Tooltip
              content={
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Full Name:</strong> {trainerInfo?.firstName}{" "}
                    {trainerInfo?.lastName}
                  </p>
                  <p>
                    <strong>Experience:</strong>{" "}
                    {trainerInfo?.experience ?? "N/A"} years
                  </p>
                  <p>
                    <strong>Location:</strong> {trainerInfo?.country ?? "N/A"},{" "}
                    {trainerInfo?.city ?? "N/A"}
                  </p>
                  <p>
                    <strong>Place of Work:</strong>{" "}
                    {trainerInfo?.placeOfWork ?? "N/A"}
                  </p>
                  <p>
                    <strong>Training Price:</strong> $
                    {trainerInfo?.trainingPrice?.toFixed(2) ?? "N/A"} / session
                  </p>
                  <p>
                    <strong>Bio:</strong> {trainerInfo?.bio ?? "N/A"}
                  </p>
                  <p>
                    <strong>Instagram:</strong>{" "}
                    {trainerInfo?.instagramLink ?? "N/A"}
                  </p>
                  <p>
                    <strong>Facebook:</strong>{" "}
                    {trainerInfo?.facebookLink ?? "N/A"}
                  </p>
                  <p>
                    <strong>Telegram:</strong>{" "}
                    {trainerInfo?.telegramLink ?? "N/A"}
                  </p>
                </div>
              }
            >
              <Button isIconOnly className="bg-background">
                <InfoIcon />
              </Button>
            </Tooltip>
          </div>
          <div className="flex gap-2">
            <Button as={RouterLink} to={ROUTES.EDIT_TRAINER_PROFILE}>
              Edit Profile
            </Button>
            <Button onPress={() => handleUpdatePost()}>
              {trainerInfo?.isPosted ? "Unpost Profile" : "Post Profile"}
            </Button>
          </div>
        </div>

        <Divider className="w-full" />
        <div className="flex" style={{ height: "calc(100vh - 180px)" }}>
          <div className="flex-1 pr-6">
            <h3 className="text-2xl font-semibold tracking-wide text-gray-900 dark:text-gray-100">
              {selectedCustomer === null
                ? "Customer's"
                : `${selectedCustomer.firstName + " " + selectedCustomer.lastName}'s`}{" "}
              Statistics
            </h3>
            <div className="bg-background p-6 rounded-lg h-full">
              <div className="flex gap-6 h-full">
                <div className="w-3/5">
                  <ExerciseLineChart userId={selectedCustomer?.id || ""} />
                </div>
                <div className="w-2/5">
                  <MuscleRadarChart userId={selectedCustomer?.id || ""} />
                </div>
              </div>
            </div>
          </div>

          <Divider className="h-full" orientation="vertical" />

          <div className="w-60 pl-6 flex flex-col">
            <h3 className="text-lg font-semibold pb-4">My Customers</h3>
            <div className="flex-1 overflow-y-auto pr-2 bg-background">
              <div className="flex flex-col gap-2 bg-background">
                {customers.map((customer) => (
                  <Card
                    key={customer.id}
                    isPressable
                    className="w-full text-left bg-background p-1 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onPress={() => handleCustomerClick(customer)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Image
                        alt={customer.firstName}
                        className="w-12 h-12 hover:opacity-80 transition-opacity"
                        src={customer.profilePicture}
                      />
                      <span className="text-sm font-medium">
                        {customer.firstName + " " + customer.lastName}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TrainerProfilePage;
