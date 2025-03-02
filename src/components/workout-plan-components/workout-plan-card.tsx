import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  User,
  Button,
  Tooltip,
} from "@heroui/react";

export interface WorkoutPlan {
  name: string;
  createdBy: CreatedBy;
  assignedTo: AssignedTo | null;
  workoutPlanEntries: WorkoutPlanEntry[];
}

interface WorkoutPlanEntry {
  reps: number;
  sets: number;
  weight: number;
  exercise: string;
  muscleGroup: string;
}

interface CreatedBy {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
}

interface AssignedTo {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
}

interface WorkoutPlanProps {
  workoutPlan: WorkoutPlan;
}

const EntryToDisplay: React.FC<{ entry: WorkoutPlanEntry }> = ({ entry }) => {
  return (
    <div className="flex items-center justify-between bg-gray-900 text-white p-4 rounded-lg shadow-lg w-full gap-4">
      <span className="font-medium text-sm text-blue-400 whitespace-nowrap">
        {entry.muscleGroup}
      </span>
      <Tooltip content={entry.exercise}>
        <span className="text-sm flex-1 text-center truncate font-semibold text-gray-300">
          {entry.exercise}
        </span>
      </Tooltip>
      <span className="text-gray-400 text-sm font-medium">
        {entry.sets} x {entry.reps}
      </span>
      <span className="text-green-400 font-semibold text-sm ml-2">
        {entry.weight} kg
      </span>
    </div>
  );
};

export const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ workoutPlan }) => {
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
          <Button className="w-full">Download PDF</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
