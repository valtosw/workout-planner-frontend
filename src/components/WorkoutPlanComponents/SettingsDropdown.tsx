import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import axios from "axios";

import { WorkoutPlanProps } from "@/types/workout-plan";
import { errorToast } from "@/types/toast";

export const SettingsDropdown = ({ workoutPlan }: WorkoutPlanProps) => {
  const handleDownloadPdf = async () => {
    try {
      const response = await axios.get(
        `/WorkoutPlan/${workoutPlan.id}/DownloadPdf`,
        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");

      a.href = url;
      a.download = `${workoutPlan.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      errorToast("Failed to download PDF");
    }
  };

  return (
    <Dropdown
      classNames={{
        content: "min-w-[120px]",
      }}
      placement="bottom-end"
    >
      <DropdownTrigger>
        <Button isIconOnly radius="full" size="sm" variant="light">
          <Icon height={16} icon="solar:menu-dots-bold" width={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        itemClasses={{
          title: "text-tiny",
        }}
        variant="flat"
      >
        <DropdownItem key="created-by" isReadOnly className="opacity-100">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Created by</span>
            <User
              avatarProps={{
                src: workoutPlan.createdBy.profilePicture ?? undefined,
                size: "sm",
              }}
              className="pl-0"
              name={`${workoutPlan.createdBy.firstName} ${workoutPlan.createdBy.lastName}`}
            />
          </div>
        </DropdownItem>

        {workoutPlan.assignedTo && (
          <DropdownItem key="assigned-to" isReadOnly className="opacity-100">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">Assigned to</span>
              <User
                avatarProps={{
                  src: workoutPlan.assignedTo.profilePicture ?? undefined,
                  size: "sm",
                }}
                className="pl-0"
                name={`${workoutPlan.assignedTo.firstName} ${workoutPlan.assignedTo.lastName}`}
              />
            </div>
          </DropdownItem>
        )}
        <DropdownItem key="view-details">View Details</DropdownItem>
        <DropdownItem key="download-pdf" onPress={handleDownloadPdf}>
          Download PDF
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
