import { useState, useEffect } from "react";
import { Select, SelectItem } from "@heroui/react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import axios from "@/api/axios";
import { useTheme } from "@heroui/use-theme";

const muscleGroups = [
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core",
  "Neck",
];

interface MuscleRadarChartProps {
  userId: string;
}

export default function MuscleRadarChart({ userId }: MuscleRadarChartProps) {
  const [data, setData] = useState<{ muscle: string; value: number }[]>([]);
  const [period, setPeriod] = useState("Week");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `Progress/FrequentlyTrainedMuscleGroups/${userId}/${period}`,
        );
        const result = response.data;
        const formattedData = muscleGroups.map((muscle) => ({
          muscle,
          value: result[muscle] || 0,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [userId, period]);

  return (
    <div className="p-6 bg-white dark:bg-[#18181c] rounded-lg">
      <div className="flex justify-end w-full mb-4">
        <Select
          aria-label="Time Range"
          className="w-32 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
          defaultSelectedKeys={["Week"]}
          listboxProps={{
            itemClasses: {
              title: "text-tiny text-gray-900 dark:text-white",
            },
          }}
          placeholder="Week"
          size="sm"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <SelectItem
            key="Week"
            className="hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Week
          </SelectItem>
          <SelectItem
            key="Month"
            className="hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Month
          </SelectItem>
          <SelectItem
            key="All Time"
            className="hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            All Time
          </SelectItem>
        </Select>
      </div>
      <ResponsiveContainer height={300} width="100%">
        <RadarChart cx="50%" cy="50%" data={data} outerRadius="80%">
          <PolarGrid stroke="#b0b0b0" strokeOpacity={0.5} />{" "}
          <PolarAngleAxis
            dataKey="muscle"
            tick={{ fill: "#4b5563", fontSize: 12, fontWeight: "bold" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "8px",
              color: "#1f2937",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Radar
            animationDuration={1500}
            animationEasing="ease-in-out"
            dataKey="value"
            fill="#909090"
            fillOpacity={0.7}
            name="Training Frequency"
            stroke="#909090"
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
