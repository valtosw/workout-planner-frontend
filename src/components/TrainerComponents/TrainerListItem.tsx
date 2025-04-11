import { Button } from "@heroui/react";
import { Image } from "@heroui/react";
import { Divider } from "@heroui/react";
import { useEffect, useState } from "react";

import { TrainerProfileModal } from "./TrainerModal";

import {
  MoneyIcon,
  LocationIcon,
  ExperienceIcon,
  PlaceOfWorkIcon,
} from "@/components/icons";
import { TrainerBlockProps } from "@/types/trainer";
import { getCountryName } from "@/api/ModelApis/CountryApi";
import { errorToast } from "@/types/toast";
import useAuth from "@/hooks/useAuth";
import axios, { axiosPrivate } from "@/api/axios";

const TrainerListItem: React.FC<TrainerBlockProps> = ({ trainer }) => {
  const [countryName, setCountryName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { auth } = useAuth();
  const [isTrainer, setIsTrainer] = useState<boolean>(false);
  const [requestStatus, setRequestStatus] = useState<string>("");
  const [statusLoading, setStatusLoading] = useState(true);

  const getRequestStatus = async (
    userId: string,
    trainerId: string,
  ): Promise<string> => {
    try {
      const response = await axios.get(
        `/TrainerRequest/RequestStatus/${userId}/${trainerId}`,
      );

      return response.data;
    } catch (error: any) {
      errorToast(error.message);

      return "No Request Found";
    }
  };

  useEffect(() => {
    (async () => {
      setStatusLoading(true);
      const status = await getRequestStatus(auth?.id || "", trainer.id);

      setRequestStatus(status);
      setStatusLoading(false);
    })();
  }, [auth?.id, trainer.id]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth?.id) {
        try {
          const response = await axiosPrivate.get(
            `/ApplicationUser/Role/${auth.id}`,
          );

          setIsTrainer(response.data === "Trainer");
        } catch (error: any) {
          errorToast(error.message);
        }
      }
    };

    fetchUserRole();
  }, [auth?.id]);

  useEffect(() => {
    const fetchCountryName = async () => {
      try {
        const countryName = await getCountryName(trainer.countryId);

        setCountryName(countryName);
      } catch (error: any) {
        errorToast(error.message);
      }
    };

    fetchCountryName();
  }, [trainer.countryId]);

  const handleSendRequest = async (trainerId: string, userId: string) => {
    try {
      await axios.post(`/TrainerRequest/SendRequest/${userId}/${trainerId}`);
      const updatedStatus = await getRequestStatus(userId, trainerId);

      setRequestStatus(updatedStatus);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4 flex-grow">
          <div className="flex-shrink-0">
            <Image
              alt={`${trainer.firstName} ${trainer.lastName}`}
              className="w-16 h-16 rounded-lg object-cover"
              src={trainer.photoUrl}
            />
          </div>

          <div className="flex-grow">
            <h3 className="text-xl font-semibold">
              {trainer.firstName} {trainer.lastName}
            </h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <ExperienceIcon className="w-4 h-4 mr-1" />
                <span>{trainer.experience || "N/A"} years experience</span>
              </div>

              <div className="flex items-center">
                <PlaceOfWorkIcon className="w-4 h-4 mr-1" />
                <span>{trainer.placeOfWork || "N/A"}</span>
              </div>

              <div className="flex items-center">
                <LocationIcon className="w-4 h-4 mr-1" />
                <span>{`${trainer.city}, ${countryName}` || "N/A"}</span>
              </div>

              <div className="flex items-center">
                <MoneyIcon className="w-4 h-4 mr-1" />
                <span>${trainer.trainingPrice.toFixed(2)}/session</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <Button
            className="whitespace-nowrap"
            variant="flat"
            onPress={() => setIsModalOpen(true)}
          >
            See more
          </Button>
          {!isTrainer &&
            !statusLoading &&
            (requestStatus === "No Request Found" ? (
              <Button
                className="text-black dark:hover:text-black dark:text-white border-white dark:hover:bg-white hover:text-black"
                onPress={() => handleSendRequest(trainer.id, auth?.id || "")}
              >
                Send a Request
              </Button>
            ) : (
              <span
                className={`inline-flex items-center justify-center px-3 h-10 text-sm rounded-lg font-small
          ${
            requestStatus === "Pending"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
              : requestStatus === "Accepted"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : requestStatus === "Rejected"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
          }
        `}
              >
                {requestStatus}
              </span>
            ))}
        </div>
      </div>
      <Divider />

      <TrainerProfileModal
        isOpen={isModalOpen}
        trainer={trainer}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TrainerListItem;
