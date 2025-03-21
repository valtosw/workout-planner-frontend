import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectItem } from "@heroui/react";

interface ExerciseLineChartProps {
  userId: string;
}

export default function ExerciseLineChart({ userId }: ExerciseLineChartProps) {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [weightProgress, setWeightProgress] = useState<
    { date: string; weight: number }[]
  >([]);

  const exercises = ["Bench Press", "Squat", "Deadlift", "Pull-Up"];

  // Fetch weight progress data based on the selected exercise
  useEffect(() => {
    if (selectedExercise) {
      // Mock API call or data fetch
      const mockData = [
        { date: "Jan", weight: 50 },
        { date: "Feb", weight: 55 },
        { date: "Mar", weight: 60 },
        { date: "Apr", weight: 65 },
      ];

      setWeightProgress(mockData);
    } else {
      setWeightProgress([]);
    }
  }, [selectedExercise]);

  return (
    <div className="bg-white dark:bg-[#18181c] p-6 rounded-lg">
      {/* Selector for Exercise */}
      <div className="flex justify-start w-full mb-4">
        <Select
          aria-label="Select Exercise"
          className="w-32 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
          listboxProps={{
            itemClasses: {
              title: "text-tiny text-gray-900 dark:text-white",
            },
          }}
          size="sm"
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          {exercises.map((exercise) => (
            <SelectItem key={exercise}>{exercise}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Line Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart data={weightProgress}>
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              activeDot={{ r: 6 }}
              dataKey="weight"
              dot={{ r: 4 }}
              stroke="#3b82f6"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
