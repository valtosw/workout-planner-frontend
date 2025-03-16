import { ModalContent, useDisclosure } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { Button } from "@heroui/react";
import { Image } from "@heroui/react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@heroui/react";
import { Link } from "@heroui/react";
import { useEffect, useState } from "react";

import {
  MoneyIcon,
  LocationIcon,
  ExperienceIcon,
  PlaceOfWorkIcon,
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
} from "@/components/icons";
import { TrainerBlockProps } from "@/types/trainer";
import { getCountryName } from "@/api/model-apis/country-api";
import { errorToast } from "@/types/toast";

const TrainerBlock: React.FC<TrainerBlockProps> = ({ trainer }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    <Card className="max-w-sm rounded-lg shadow-lg">
      <CardHeader className="relative w-full h-48 p-2">
        <div className="w-full h-full rounded-lg overflow-hidden items-center justify-center flex">
          <Image
            alt={`${trainer.firstName} ${trainer.lastName}`}
            className="inset-0 w-full h-full object-cover"
            src={trainer.photoUrl}
          />
        </div>
      </CardHeader>
      <CardBody className="pt-0 pb-1">
        <h3 className="text-2xl pb-1 font-semibold">
          {trainer.firstName} {trainer.lastName}
        </h3>
        <div className="text-sm text-gray-500 flex items-center truncate">
          <ExperienceIcon className="w-4 h-4 mr-1" />
          Experience: {trainer.experience || "N/A"}
        </div>
        <div className="text-sm text-gray-500 flex items-center truncate">
          <LocationIcon className="w-4 h-4 mr-1" />
          Location: {`${trainer.city}, ${countryName}` || "N/A"}
        </div>
        <div className="text-sm text-gray-500 flex items-center truncate">
          <PlaceOfWorkIcon className="w-4 h-4 mr-1" />
          Place of Work: {trainer.placeOfWork || "N/A"}
        </div>
        <div className="text-sm text-gray-500 flex items-center truncate">
          <MoneyIcon className="w-4 h-4 mr-1" />
          Training Price: ${trainer.trainingPrice.toFixed(2)}
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="flat" onPress={onOpen}>
          See more
        </Button>
      </CardFooter>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {trainer.firstName} {trainer.lastName}
              </ModalHeader>
              <ModalBody>
                <p className="text-sm">{trainer.bio || "No bio available."}</p>
                <div className="mt-4">
                  <p>
                    <strong>Experience:</strong> {trainer.experience || "N/A"}
                  </p>
                  <p>
                    <strong>Place of Work:</strong>{" "}
                    {trainer.placeOfWork || "N/A"}
                  </p>
                  <p>
                    <strong>Training Price:</strong> $
                    {trainer.trainingPrice.toFixed(2)}
                  </p>
                </div>
                <div className="mt-4 flex gap-3">
                  {trainer.instagramLink && (
                    <Button
                      isExternal
                      as={Link}
                      className="bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976] p-4 text-white rounded-lg"
                      href={trainer.instagramLink}
                      startContent={<InstagramIcon />}
                      variant="flat"
                    >
                      Instagram
                    </Button>
                  )}
                  {trainer.facebookLink && (
                    <Button
                      isExternal
                      as={Link}
                      className="bg-gradient-to-r from-[#1877F2] to-[#0E5A94] p-4 text-white rounded-lg"
                      href={trainer.facebookLink}
                      startContent={<FacebookIcon />}
                      variant="flat"
                    >
                      Facebook
                    </Button>
                  )}
                  {trainer.telegramLink && (
                    <Button
                      isExternal
                      as={Link}
                      className="bg-gradient-to-r from-[#0088cc] to-[#229ED9] p-4 text-white rounded-lg"
                      href={trainer.telegramLink}
                      startContent={<TelegramIcon />}
                      variant="flat"
                    >
                      Telegram
                    </Button>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default TrainerBlock;
