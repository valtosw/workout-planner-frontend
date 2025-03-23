import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  User,
  Button,
  Tooltip,
} from "@heroui/react";

import { WorkoutPlanEntry, WorkoutPlanProps } from "../../types/workout-plan";

import axios from "@/api/axios";
import { errorToast } from "@/types/toast";

const EntryToDisplay: React.FC<{ entry: WorkoutPlanEntry }> = ({ entry }) => {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 rounded-xl shadow-md w-full gap-2">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-blue-600 dark:text-blue-400 text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg">
          {entry.muscleGroup}
        </span>
        <Tooltip content={entry.exercise}>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-300 truncate">
            {entry.exercise}
          </span>
        </Tooltip>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-gray-600 dark:text-gray-400 text-xs">Sets</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {entry.sets}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-600 dark:text-gray-400 text-xs">Reps</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {entry.reps}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-600 dark:text-gray-400 text-xs">
            Weight
          </span>
          <span className="font-semibold text-green-600 dark:text-green-400 text-sm">
            {entry.weight} kg
          </span>
        </div>
      </div>
    </div>
  );
};

export const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ workoutPlan }) => {
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
    <Card className="min-w-[280px] max-w-sm min-h-[550px] flex flex-col border border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-white rounded-xl bg-background transition-all p-6">
      <CardHeader>
        <h1 className="text-xl font-semibold text-left">{workoutPlan.name}</h1>
      </CardHeader>

      <CardBody className="flex flex-col gap-3 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        {workoutPlan.workoutPlanEntries.map((entry, index) => (
          <EntryToDisplay key={index} entry={entry} />
        ))}
      </CardBody>

      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-center">
            <h1 className="text-sm text-gray-400">Created By:</h1>
            <User
              avatarProps={{
                src: workoutPlan.createdBy.profilePicture ?? undefined,
              }}
              description={workoutPlan.createdBy.email}
              name={`${workoutPlan.createdBy.firstName} ${workoutPlan.createdBy.lastName}`}
            />
          </div>

          {workoutPlan.assignedTo !== null && (
            <div className="flex flex-col items-center">
              <h1 className="text-sm text-gray-400">Assigned To:</h1>
              <User
                avatarProps={{
                  src: workoutPlan.assignedTo.profilePicture ?? undefined,
                }}
                description={workoutPlan.assignedTo.email}
                name={`${workoutPlan.assignedTo.firstName} ${workoutPlan.assignedTo.lastName}`}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          <Button className="w-full">View Workout Plan</Button>
          <Button className="w-full" onPress={handleDownloadPdf}>
            Download PDF
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
