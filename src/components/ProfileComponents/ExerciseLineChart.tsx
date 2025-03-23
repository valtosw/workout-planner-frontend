import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectItem } from "@heroui/react";

import axios from "@/api/axios";

interface ExerciseLineChartProps {
  userId: string;
}

export default function ExerciseLineChart({ userId }: ExerciseLineChartProps) {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [weightProgress, setWeightProgress] = useState<
    { date: string; weight: number }[]
  >([]);
  const [period, setPeriod] = useState("Month");

  const [exercises, setExercises] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTopExercises() {
      try {
        const response = await axios.get(
          `Exercise/MostLoggedExercises/${userId}`,
        );

        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchTopExercises();
  }, [userId]);

  useEffect(() => {
    async function fetchWeightProgress() {
      try {
        const response = await axios.get(
          `Progress/WeightLifted/${userId}/${selectedExercise}/${period}`,
        );

        const transformedData = response.data.map(
          (item: { logDate: string; weight: number }) => {
            const date = new Date(item.logDate);

            const formattedDate =
              period === "Month"
                ? date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })
                : date.toLocaleDateString("en-US", { month: "short" });

            return {
              date: formattedDate,
              weight: item.weight,
            };
          },
        );

        setWeightProgress(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchWeightProgress();
  }, [userId, selectedExercise, period]);

  return (
    <div className="bg-white dark:bg-[#18181c] p-6 rounded-lg">
      <div className="flex justify-between w-full mb-4">
        <Select
          aria-label="Select Exercise"
          className="w-1/2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
          listboxProps={{
            itemClasses: {
              title: "text-tiny text-gray-900 dark:text-white",
            },
          }}
          size="sm"
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          {exercises.map((exercise) => (
            <SelectItem key={exercise} title={exercise}>
              {exercise}
            </SelectItem>
          ))}
        </Select>

        <Select
          aria-label="Time Range"
          className="w-32 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
          defaultSelectedKeys={["Month"]}
          listboxProps={{
            itemClasses: {
              title: "text-tiny text-gray-900 dark:text-white",
            },
          }}
          placeholder="Time Period"
          size="sm"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <SelectItem
            key="Month"
            className="hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Month
          </SelectItem>
          <SelectItem
            key="Year"
            className="hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Year
          </SelectItem>
        </Select>
      </div>

      <div className="h-[300px]">
        {selectedExercise ? (
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={weightProgress}>
              <XAxis dataKey="date" tick={{ fill: "#b0b0b0" }} />
              <YAxis tick={{ fill: "#b0b0b0" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  color: "#1f2937",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                barSize={100}
                className="fill-[#909090] dark:fill-white"
                dataKey="weight"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center justify-center text-gray-500 dark:text-gray-400">
            Select an exercise to view progress
          </p>
        )}
      </div>
    </div>
  );
}
