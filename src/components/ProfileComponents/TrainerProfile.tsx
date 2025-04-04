import { useEffect, useState } from "react";
import { Avatar, Button, Divider, Card, Image } from "@heroui/react";

import MuscleRadarChart from "./MuscleRadarChart";
import ExerciseLineChart from "./ExerciseLineChart";

import useAuth from "@/hooks/useAuth";
import { Trainer } from "@/types/trainer";
import axios from "@/api/axios";
import DefaultLayout from "@/layouts/Default";

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

const TrainerProfilePage = () => {
  const { user, auth } = useAuth();
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

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
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
            <h3 className="text-lg font-semibold pb-4">My Trainers</h3>
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
