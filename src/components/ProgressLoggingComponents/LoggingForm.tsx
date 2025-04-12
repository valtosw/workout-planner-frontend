import React, { useState, useEffect } from "react";
import {
  NumberInput,
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  DatePicker,
} from "@heroui/react";
import { CalendarDate, DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import axios from "@/api/axios";


interface ProgressLogDto {
  ExerciseName: string;
  LogDate: string;
  Weight: number;
}

const ProgressLogForm: React.FC<{ userId: string }> = ({ userId }) => {
  const [exercises, setExercises] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);

  const onSelectionChange = (key: React.Key | null) => {
    setSelectedKey(key);
  };

  const onInputChange = (value: string) => {
    setSelectedExercise(value);
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
  }, []);

  const handleLogProgress = async () => {
    if (!selectedExercise || !selectedDate) {
      console.log("Selected exercise:", selectedExercise);
      console.log("Selected weight:", weight);
      console.log("Selected date:", selectedDate);

      alert("Please fill all required fields");

      return;
    }

    const progressLog: ProgressLogDto = {
      ExerciseName: selectedExercise,
      LogDate: new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.day + 1,
      ).toISOString(),
      Weight: weight,
    };

    setIsLoading(true);

    console.log("Progress Log:", progressLog);
    try {
      await axios.post(`/Progress/LogProgress/${userId}`, progressLog, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleClear();
    } catch (error) {
      console.error("Error logging progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedExercise("");
    setWeight(0);
    setSelectedDate(parseDate(new Date().toISOString().split("T")[0]));
  };

  return (
    <div className="space-y-4 max-w-md mx-auto p-4 bg-background rounded-lg shadow">
      <h2 className="text-xl font-bold">Log Your Progress</h2>

      <div>
        <Autocomplete
          isRequired
          isVirtualized
          label="Exercise"
          placeholder={"Select exercise"}
          onInputChange={onInputChange}
          onSelectionChange={onSelectionChange}
        >
          {exercises.map((exercise) => (
            <AutocompleteItem key={exercise}>{exercise}</AutocompleteItem>
          ))}
        </Autocomplete>
      </div>

      <div>
        <NumberInput
          hideStepper
          isRequired
          label="Weight (kg)"
          minValue={0}
          placeholder="Enter weight"
          value={weight}
          onValueChange={setWeight}
        />
      </div>

      <div>
        <DatePicker
          isRequired
          showMonthAndYearPickers
          label="Log Date"
          value={selectedDate}
          onChange={(value) => value && setSelectedDate(value)}
        />
      </div>

      <div className="flex space-x-2 pt-2">
        <Button
          color="default"
          disabled={isLoading}
          variant="flat"
          onPress={handleLogProgress}
        >
          {isLoading ? "Logging..." : "Log"}
        </Button>
        <Button color="default" variant="flat" onPress={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ProgressLogForm;
