import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  DropdownItem,
  Spinner,
} from "@heroui/react";

import axios from "../../api/axios";

type TrainerRequestDto = {
  id: number;
  status: string;
  userProfilePicture?: string;
  userFirstName: string;
  userLastName: string;
};

interface TrainerRequestsModalProps {
  userId: string;
  role: "Customer" | "Trainer";
}

export const TrainerRequestsModal: React.FC<TrainerRequestsModalProps> = ({
  userId,
  role,
}) => {
  const [requests, setRequests] = useState<TrainerRequestDto[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setIsOpen(true);
    setLoading(true);
    try {
      const res = await axios.get(
        `/TrainerRequest/AllTrainerRequests/${userId}`,
      );

      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching trainer requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = (id: number) => {
    // TODO: Add backend call to accept
    console.log("Accept", id);
  };

  const handleReject = (id: number) => {
    // TODO: Add backend call to reject
    console.log("Reject", id);
  };

  return (
    <>
      <DropdownItem key="requests" onClick={handleOpen}>
        Trainer Requests
      </DropdownItem>

      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        size="lg"
        onOpenChange={setIsOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Trainer Requests</ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className="flex justify-center py-10">
                    <Spinner color="primary" />
                  </div>
                ) : requests.length === 0 ? (
                  <p className="text-center text-sm text-gray-500">
                    No requests found.
                  </p>
                ) : (
                  requests.map((req) => (
                    <div
                      key={req.id}
                      className="flex justify-between items-center border p-3 rounded-lg mb-3 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={`${req.userFirstName} ${req.userLastName}`}
                          size="md"
                          src={req.userProfilePicture || ""}
                        />
                        <div>
                          <p className="font-medium">
                            {req.userFirstName} {req.userLastName}
                          </p>
                          {role === "Customer" && (
                            <p className="text-sm text-gray-500">
                              Status: {req.status}
                            </p>
                          )}
                        </div>
                      </div>
                      {role === "Trainer" && (
                        <div className="flex gap-2">
                          <Button
                            color="success"
                            size="sm"
                            onClick={() => handleAccept(req.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleReject(req.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
