import {
  Autocomplete,
  AutocompleteItem,
  NumberInput,
  Button,
} from "@heroui/react";
import { useEffect, useState } from "react";

import axios from "@/api/axios";

interface WorkoutEntryProps {
  onRemove: () => void;
  onUpdate: (entry: WorkoutEntryData) => void;
}

export interface WorkoutEntryData {
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
}

const WorkoutEntry: React.FC<WorkoutEntryProps> = ({ onRemove, onUpdate }) => {
  const [exercises, setExercises] = useState<string[]>([]);
  const [entryData, setEntryData] = useState<WorkoutEntryData>({
    exercise: "",
    weight: 0,
    reps: 0,
    sets: 0,
  });

  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);

  const onSelectionChange = (key: React.Key | null) => {
    setSelectedKey(key);
  };

  const onInputChange = (value: string) => {
    const newData = { ...entryData, exercise: value };

    setEntryData(newData);
    onUpdate(newData);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("/Exercise/AllExercises");

        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  });

  const handleNumberInputChange = (
    field: keyof WorkoutEntryData,
    value: number,
  ) => {
    const newData = { ...entryData, [field]: value };

    setEntryData(newData);
    onUpdate(newData);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Workout Entry</h3>
        <Button size="sm" variant="ghost" onPress={onRemove}>
          Remove
        </Button>
      </div>

      <div className="space-y-4">
        <Autocomplete
          isRequired
          isVirtualized
          label="Exercise"
          value={entryData.exercise}
          onInputChange={onInputChange}
          onSelectionChange={onSelectionChange}
        >
          {exercises.map((exercise) => (
            <AutocompleteItem key={exercise}>{exercise}</AutocompleteItem>
          ))}
        </Autocomplete>

        <div className="grid grid-cols-3 gap-4">
          <NumberInput
            hideStepper
            label="Weight (kg)"
            min={0}
            value={entryData.weight}
            onChange={(value) =>
              handleNumberInputChange(
                "weight",
                typeof value === "number"
                  ? value
                  : parseFloat(value.target.value),
              )
            }
          />
          <NumberInput
            hideStepper
            label="Reps"
            min={0}
            value={entryData.reps}
            onChange={(value) =>
              handleNumberInputChange(
                "reps",
                typeof value === "number"
                  ? value
                  : parseFloat(value.target.value),
              )
            }
          />
          <NumberInput
            hideStepper
            label="Sets"
            min={0}
            value={entryData.sets}
            onChange={(value) =>
              handleNumberInputChange(
                "sets",
                typeof value === "number"
                  ? value
                  : parseFloat(value.target.value),
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutEntry;
