import { Avatar, Button, Input, Select, SelectItem, User } from "@heroui/react";
import { useEffect, useState } from "react";

import axios, { axiosPrivate } from "@/api/axios";
import WorkoutPlanEntry, {
  WorkoutEntryData,
} from "@/components/WorkoutPlanComponents/WorkoutPlanEntry";
import useAuth from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/Default";
import { errorToast, successToast } from "@/types/toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/Routes";

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

const CreateWorkoutPlanPage: React.FC = () => {
  const { auth } = useAuth();
  const [isTrainer, setIsTrainer] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [workoutPlanName, setWorkoutPlanName] = useState("");
  const [assignedToId, setAssignedToId] = useState<string | null>(null);
  const [entries, setEntries] = useState<WorkoutEntryData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth?.id) {
        try {
          const response = await axiosPrivate.get(
            `/ApplicationUser/Role/${auth.id}`,
          );

          setIsTrainer(response.data === "Trainer");
        } catch (error: any) {
          errorToast(error.message);
        }
      }
    };

    fetchUserRole();
  }, [auth?.id]);

  useEffect(() => {
    if (isTrainer) {
      const fetchCustomers = async () => {
        try {
          const response = await axios.get(
            `/Trainer/PersonalCustomers/${auth?.id}`,
          );

          setCustomers(response.data);
        } catch (error: any) {
          console.error(error);
        }
      };

      fetchCustomers();
    }
  }, [isTrainer, auth?.id]);

  const addNewEntry = () => {
    setEntries([
      ...entries,
      {
        exercise: "",
        weight: 0,
        reps: 0,
        sets: 0,
      },
    ]);
  };

  const updateEntry = (index: number, updatedEntry: WorkoutEntryData) => {
    const newEntries = [...entries];

    newEntries[index] = updatedEntry;
    setEntries(newEntries);
  };

  const removeEntry = (index: number) => {
    const newEntries = [...entries];

    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  const handleCreateWorkoutPlan = async () => {
    if (!workoutPlanName || entries.length === 0) {
      errorToast("Please fill all required fields");

      return;
    }

    const createWorkoutPlanDto = {
      name: workoutPlanName,
      createdById: auth?.id,
      assignedToId: assignedToId || null,
      workoutPlanEntries: entries.map((entry) => ({
        exercise: entry.exercise,
        weight: entry.weight,
        reps: entry.reps,
        sets: entry.sets,
      })),
    };

    try {
      const response = await axiosPrivate.post(
        "/WorkoutPlan/CreateNewWorkoutPlan",
        createWorkoutPlanDto,
      );

      if (response.status === 200) {
        successToast("Workout plan created successfully!");
        navigate(ROUTES.WORKOUT_PLANS);
      }
    } catch (error) {
      console.error("Error creating workout plan:", error);
      errorToast("Failed to create workout plan");
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col p-6 w-full h-[calc(100vh-5rem)] overflow-hidden">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-900 dark:text-gray-100 mb-6 text-center">
          Create Workout Plan
        </h1>

        <div className="flex flex-1 gap-6 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="sticky top-0 z-10 pb-4">
              <Button onPress={addNewEntry}>Add Entry</Button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">
              {entries.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">
                    No entries yet. Click &rdquo;Add Entry&quot; to get started.
                  </p>
                </div>
              ) : (
                entries.map((entry, index) => (
                  <WorkoutPlanEntry
                    key={index}
                    onRemove={() => removeEntry(index)}
                    onUpdate={(updatedEntry) =>
                      updateEntry(index, updatedEntry)
                    }
                  />
                ))
              )}
            </div>
          </div>
          <div className="w-80 flex flex-col gap-6 p-4 border-l dark:border-gray-700">
            <Input
              isRequired
              errorMessage="Please enter a workout plan name"
              label="Workout Plan Name"
              value={workoutPlanName}
              onChange={(e) => setWorkoutPlanName(e.target.value)}
            />

            {isTrainer && (
              <Select
                items={customers}
                label="Assign To"
                onChange={(e) => setAssignedToId(e.target.value)}
              >
                {customers.map((customer) => (
                  <SelectItem
                    key={customer.id}
                    textValue={`${customer.firstName} ${customer.lastName}`}
                  >
                    <User
                      avatarProps={{
                        src: customer.profilePicture,
                        size: "sm",
                      }}
                      className="pl-0"
                      name={`${customer.firstName} ${customer.lastName}`}
                    />
                  </SelectItem>
                ))}
              </Select>
            )}

            <div className="mt-auto">
              <Button
                fullWidth
                disabled={!workoutPlanName || entries.length === 0}
                size="lg"
                variant="flat"
                onPress={handleCreateWorkoutPlan}
              >
                Create Workout Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateWorkoutPlanPage;
