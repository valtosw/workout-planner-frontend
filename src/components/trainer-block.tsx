/* eslint-disable prettier/prettier */
//import { useState } from "react";
import { ModalContent, useDisclosure } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { Button } from "@heroui/react";
import { Image } from "@heroui/react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@heroui/react";
import MoneyIcon from "./icons";

interface Trainer{
    firstName: string;
    lastName: string;
    photoUrl: string;
    experience?: string;
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


// TODO: finish implementing the TrainerBlock component
const TrainerBlock: React.FC<TrainerBlockProps> = ({ trainer }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <Card className="max-w-sm rounded-lg shadow-lg">
        <CardHeader>
          <Image
            alt={`${trainer.firstName} ${trainer.lastName}`}
            className="p-0 w-full h-full object-cover rounded-lg"
            src={trainer.photoUrl} />
        </CardHeader>
        <CardBody className="pt-0 pb-1">
          <h3 className="text-2xl font-semibold">{trainer.firstName} {trainer.lastName}</h3>
          <p className="text-sm text-gray-500">Experience: {trainer.experience || "N/A"}</p>
          <p className="text-sm text-gray-500">Place of Work: {trainer.placeOfWork || "N/A"}</p>
          {/* <p className="text-sm text-gray-500">Training Price: ${trainer.trainingPrice.toFixed(2)}</p> */}
          <div className="text-sm text-gray-500 flex items-center">
            <MoneyIcon className="w-4 h-4 mr-1"/> {/* Adjust icon size and spacing */}
            Training Price: ${trainer.trainingPrice.toFixed(2)}
          </div>
        </CardBody>
        <CardFooter>
          <Button variant="flat" onPress={onOpen}>See more</Button>
        </CardFooter>
  
        {/* Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) =>(
                    <>
                        <ModalHeader>{trainer.firstName} {trainer.lastName}</ModalHeader>
                        <ModalBody>
                            <p className="text-sm">{trainer.bio || "No bio available."}</p>
                            <div className="mt-4">
                            <p><strong>Experience:</strong> {trainer.experience || "N/A"}</p>
                            <p><strong>Place of Work:</strong> {trainer.placeOfWork || "N/A"}</p>
                            <p><strong>Training Price:</strong> ${trainer.trainingPrice.toFixed(2)}</p>
                            </div>
                            <div className="mt-4 flex gap-3">
                            {trainer.instagramLink && <a href={trainer.instagramLink} rel="noopener noreferrer" target="_blank">Instagram</a>}
                            {trainer.facebookLink && <a href={trainer.facebookLink} rel="noopener noreferrer" target="_blank">Facebook</a>}
                            {trainer.telegramLink && <a href={trainer.telegramLink} rel="noopener noreferrer" target="_blank">Telegram</a>}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
      </Card>
    );
  };
  
  export type {Trainer};
  export default TrainerBlock;
