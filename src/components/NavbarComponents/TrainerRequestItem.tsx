import React from "react";
import { Button, Avatar } from "@heroui/react";

import axios from "../../api/axios";

export type TrainerRequestDto = {
  id: number;
  status: string;
  userProfilePicture?: string;
  userFirstName: string;
  userLastName: string;
};

interface TrainerRequestItemProps {
  req: TrainerRequestDto;
  role: "Customer" | "Trainer";
  onStatusUpdate: (id: number, newStatus: string) => void;
}

const TrainerRequestItem: React.FC<TrainerRequestItemProps> = ({
  req,
  role,
  onStatusUpdate,
}) => {
  const handleAccept = async () => {
    try {
      await axios.put(`/TrainerRequest/AcceptRequest/${req.id}`);
      onStatusUpdate(req.id, "Accepted");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`/TrainerRequest/RejectRequest/${req.id}`);
      onStatusUpdate(req.id, "Rejected");
    } catch (err) {
      console.error(err);
    }
  };

  const statusColorClasses = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Accepted:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    Default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  };

  const getStatusClass = (status: string) =>
    statusColorClasses[status as keyof typeof statusColorClasses] ??
    statusColorClasses.Default;

  return (
    <div className="flex justify-between items-center border p-3 rounded-lg mb-3 shadow-sm">
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
          {req.status && (
            <span
              className={`inline-flex items-center justify-center px-3 h-8 text-sm rounded-lg font-medium mt-1 ${getStatusClass(
                req.status,
              )}`}
            >
              {req.status}
            </span>
          )}
        </div>
      </div>
      {role === "Trainer" && req.status === "Pending" && (
        <div className="flex gap-2">
          <Button
            color="success"
            size="md"
            variant="flat"
            onPress={handleAccept}
          >
            Accept
          </Button>
          <Button
            color="danger"
            size="md"
            variant="flat"
            onPress={handleReject}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrainerRequestItem;
