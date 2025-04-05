import {
  Button,
  Card,
  Input,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { useEffect, useState } from "react";

import { CheckIcon, EditIcon, PlusIcon } from "../icons";

import { WorkoutPlanEntry } from "./WorkoutPlanEntry";

import { errorToast } from "@/types/toast";
import { getMuscleGroupList } from "@/api/ModelApis/MuscleGroupApi";

export const CreateWorkoutPlanCard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);

  const [workoutPlanName, setWorkoutPlanName] = useState("Workout Plan");
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);

  const resetParameters = () => {
    setWorkoutPlanName("Workout Plan");
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchMuscleGroups = async () => {
      try {
        const response = await getMuscleGroupList();

        setMuscleGroups(response);
      } catch (error: any) {
        errorToast("Failed to fetch muscle groups");
      }
    };

    fetchMuscleGroups();
  }, []);

  return (
    <>
      <Card
        isPressable
        className="w-full sm:w-auto max-w-sm min-h-[550px] flex flex-col items-center justify-center border border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-white rounded-xl bg-background transition-all p-6"
        onPress={() => {
          resetParameters();
          onOpen();
        }}
      >
        <PlusIcon size={60} />
        <span className="text-black dark:text-white mt-4 text-lg font-semibold">
          Create Workout Plan
        </span>
      </Card>

      {isOpen && (
        <Drawer
          hideCloseButton
          classNames={{
            base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 rounded-medium overflow-visible",
          }}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <DrawerContent>
            {(onClose) => (
              <>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <Input
                      className="pl-5 py-2 w-3/4 rounded-md"
                      maxLength={30}
                      minLength={3}
                      type="text"
                      value={workoutPlanName}
                      onChange={(e) => setWorkoutPlanName(e.target.value)}
                    />
                  ) : (
                    <DrawerHeader className="flex flex-col gap-1 pr-1">
                      {workoutPlanName}
                    </DrawerHeader>
                  )}

                  <Button
                    isIconOnly
                    className="rounded-xl ml-0"
                    color="default"
                    variant="flat"
                    onPress={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <CheckIcon size={14} />
                    ) : (
                      <EditIcon size={14} />
                    )}
                  </Button>
                </div>
                <DrawerBody>
                  <WorkoutPlanEntry muscleGroups={muscleGroups} />
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Save
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
