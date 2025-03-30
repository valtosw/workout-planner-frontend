import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Image,
} from "@heroui/react";
import { useState, useEffect } from "react";

import { InstagramIcon, FacebookIcon, TelegramIcon } from "../icons";

import { Trainer } from "@/types/trainer";
import { getCountryName } from "@/api/ModelApis/CountryApi";
import { errorToast } from "@/types/toast";

interface TrainerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainer: Trainer;
}

export const TrainerProfileModal = ({
  isOpen,
  onClose,
  trainer,
}: TrainerProfileModalProps) => {
  const [countryName, setCountryName] = useState<string>("");

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
    <Modal isOpen={isOpen} size="lg" onClose={onClose}>
      <ModalContent className="bg-white dark:bg-[#18181c] rounded-lg overflow-hidden">
        {(onClose) => (
          <>
            <ModalBody className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 flex-shrink-0">
                  <Image
                    alt={`${trainer.firstName} ${trainer.lastName}`}
                    className="w-full h-full object-cover"
                    height={80}
                    src={trainer.photoUrl}
                    width={80}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {trainer.firstName} {trainer.lastName}
                  </h2>
                  <div className="flex gap-2 mt-2">
                    {trainer.instagramLink && (
                      <Link isExternal href={trainer.instagramLink}>
                        <InstagramIcon className="w-6 h-6 text-pink-500 hover:text-pink-600" />
                      </Link>
                    )}
                    {trainer.facebookLink && (
                      <Link isExternal href={trainer.facebookLink}>
                        <FacebookIcon className="w-6 h-6 text-blue-500 hover:text-blue-600" />
                      </Link>
                    )}
                    {trainer.telegramLink && (
                      <Link isExternal href={trainer.telegramLink}>
                        <TelegramIcon className="w-6 h-6 text-blue-400 hover:text-blue-500" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  {trainer.bio || "No bio available."}
                </p>

                <div className="space-y-2">
                  <p>
                    <strong>Experience:</strong> {trainer.experience || "N/A"}{" "}
                    years
                  </p>
                  <p>
                    <strong>Location:</strong> {trainer.city || "Unknown City"},{" "}
                    {countryName}
                  </p>
                  <p>
                    <strong>Place of Work:</strong>{" "}
                    {trainer.placeOfWork || "N/A"}
                  </p>
                  <p>
                    <strong>Training Price:</strong> $
                    {trainer.trainingPrice.toFixed(2)} / session
                  </p>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
