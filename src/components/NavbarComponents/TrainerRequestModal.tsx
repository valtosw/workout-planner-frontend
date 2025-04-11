import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";

import axios from "../../api/axios";

import TrainerRequestItem, { TrainerRequestDto } from "./TrainerRequestItem";

interface TrainerRequestsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  role: "Customer" | "Trainer";
}

export const TrainerRequestsModal: React.FC<TrainerRequestsModalProps> = ({
  isOpen,
  onOpenChange,
  userId,
  role,
}) => {
  const [requests, setRequests] = useState<TrainerRequestDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchRequests = async () => {
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

    fetchRequests();
  }, [isOpen, userId]);

  const updateRequestStatus = (id: number, newStatus: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req)),
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        size="lg"
        onOpenChange={onOpenChange}
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
                    <TrainerRequestItem
                      key={req.id}
                      req={req}
                      role={role}
                      onStatusUpdate={updateRequestStatus}
                    />
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
