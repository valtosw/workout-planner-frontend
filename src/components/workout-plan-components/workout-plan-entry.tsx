import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  NumberInput,
  Input,
} from "@heroui/react";
import { useEffect, useState } from "react";

import { errorToast } from "@/types/toast";
import { getExerciseListByMuscleGroup } from "@/api/model-apis/exercise-api";

interface WorkoutPlanEntryProps {
  muscleGroups: string[];
}

export const WorkoutPlanEntry: React.FC<WorkoutPlanEntryProps> = ({
  muscleGroups,
}) => {
  const [exercises, setExercises] = useState<string[]>([]);
  const [isMuscleGroupSelected, setIsMuscleGroupSelected] =
    useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);

  const [muscleGroup, setMuscleGroup] = useState<string>("");
  const [exercise, setExercise] = useState<string>("");
  const [reps, setReps] = useState<number>(0);
  const [sets, setSets] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const fetchExercisesByGroup = async () => {
    try {
      const response = await getExerciseListByMuscleGroup(muscleGroup);

      setExercises(response);
    } catch (error: any) {
      errorToast("Failed to fetch exercises for a muscle group");
    }
  };

  useEffect(() => {
    if (muscleGroup) {
      fetchExercisesByGroup();
    }
  }, [muscleGroup]);

  const onSelectionChange = (key: React.Key | null) => {
    setSelectedKey(key);
    setExercise(key as string);
  };

  const onInputChange = (value: string) => {
    setExercise(value);
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMuscleGroup(e.target.value);
    setIsMuscleGroupSelected(true);
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
        <Select
          isRequired
          className="w-40"
          label="Muscle Group"
          selectedKeys={muscleGroup}
          onChange={handleSelectionChange}
        >
          {muscleGroups.map((mg) => (
            <SelectItem key={mg}>{mg}</SelectItem>
          ))}
        </Select>

        <Autocomplete
          isRequired
          className="w-48"
          isDisabled={!isMuscleGroupSelected}
          label="Exercise"
          onInputChange={onInputChange}
          onSelectionChange={onSelectionChange}
        >
          {exercises.map((exercise) => (
            <AutocompleteItem key={exercise}>{exercise}</AutocompleteItem>
          ))}
        </Autocomplete>

        <NumberInput
          hideStepper
          className="w-24"
          defaultValue={0}
          label="Reps"
          minValue={0}
          placeholder="Reps"
          onValueChange={(value) => setReps(value)}
        />

        <NumberInput
          hideStepper
          className="w-24"
          defaultValue={0}
          label="Sets"
          minValue={0}
          placeholder="Sets"
          onValueChange={(value) => setSets(value)}
        />

        <Input
          className=""
          endContent="KG"
          errorMessage="Input valid weight"
          label="Weight"
          pattern="^\d+(\.\d{1,2})?$"
          placeholder="0.0"
          type="text"
          onValueChange={(value) =>
            setWeight(parseFloat(parseFloat(value).toFixed(2)))
          }
        />
      </div>
    </>
  );
};
