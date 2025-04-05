import { Card, CardHeader, CardBody, Tooltip } from "@heroui/react";

import { WorkoutPlanEntry, WorkoutPlanProps } from "../../types/workout-plan";

import { SettingsDropdown } from "./SettingsDropdown";

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
  return (
    <Card className="min-w-[280px] max-w-sm h-[550px] flex flex-col border border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-white rounded-xl bg-background transition-all p-6">
      <CardHeader className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">{workoutPlan.name}</h1>
        <SettingsDropdown workoutPlan={workoutPlan} />
      </CardHeader>

      <CardBody className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 max-h-[400px]">
        {workoutPlan.workoutPlanEntries.map((entry, index) => (
          <EntryToDisplay key={index} entry={entry} />
        ))}
      </CardBody>
    </Card>
  );
};
