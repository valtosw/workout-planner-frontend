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
import { axiosPrivate } from "@/api/axios";

const TrainerListItem: React.FC<TrainerBlockProps> = ({ trainer }) => {
  const [countryName, setCountryName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { auth } = useAuth();
  const [isTrainer, setIsTrainer] = useState<boolean>(false);

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
          {!isTrainer && (
            <Button
              className="text-black dark:hover:text-black dark:text-white border-white dark:hover:bg-white hover:text-black"
              onPress={() => {
                /* Handle request */
              }}
            >
              Send a Request
            </Button>
          )}
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
