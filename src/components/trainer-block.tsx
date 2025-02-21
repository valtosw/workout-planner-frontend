import { ModalContent, useDisclosure } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { Button } from "@heroui/react";
import { Image } from "@heroui/react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@heroui/react";
import { Link } from "@heroui/react";

import {
  MoneyIcon,
  LocationIcon,
  ExperienceIcon,
  PlaceOfWorkIcon,
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
} from "./icons";

interface Trainer {
  firstName: string;
  lastName: string;
  photoUrl: string;
  experience?: string;
  location?: string;
  placeOfWork?: string;
  trainingPrice: number;
  bio?: string;
  instagramLink?: string;
  facebookLink?: string;
  telegramLink?: string;
}

interface TrainerBlockProps {
  trainer: Trainer;
}

const TrainerBlock: React.FC<TrainerBlockProps> = ({ trainer }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="max-w-sm rounded-lg shadow-lg">
      <CardHeader>
        <Image
          alt={`${trainer.firstName} ${trainer.lastName}`}
          className="p-0 w-full h-full object-cover rounded-lg"
          src={trainer.photoUrl}
        />
      </CardHeader>
      <CardBody className="pt-0 pb-1">
        <h3 className="text-2xl pb-1 font-semibold">
          {trainer.firstName} {trainer.lastName}
        </h3>
        <div className="text-sm text-gray-500 flex items-center">
          <ExperienceIcon className="w-4 h-4 mr-1" />
          Experience: {trainer.experience || "N/A"}
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          <LocationIcon className="w-4 h-4 mr-1" />
          Location: {trainer.location || "N/A"}
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          <PlaceOfWorkIcon className="w-4 h-4 mr-1" />
          Place of Work: {trainer.placeOfWork || "N/A"}
        </div>
        <div className="text-sm text-gray-500 flex items-center">
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

export type { Trainer };
export default TrainerBlock;
