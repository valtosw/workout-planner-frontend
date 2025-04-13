import { Card } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

import { PlusIcon } from "../icons";

import { ROUTES } from "@/constants/Routes";

export const CreateWorkoutPlanCard = () => {
  return (
    <>
      <Card
        isPressable
        as={RouterLink}
        className="w-full sm:w-auto max-w-sm min-h-[550px] flex flex-col items-center justify-center border border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-white rounded-xl bg-background transition-all p-6"
        to={ROUTES.CREATE_WORKOUT_PLAN}
      >
        <PlusIcon size={60} />
        <span className="text-black dark:text-white mt-4 text-lg font-semibold">
          Create Workout Plan
        </span>
      </Card>
    </>
  );
};
