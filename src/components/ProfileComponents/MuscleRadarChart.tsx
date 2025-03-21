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
    <div>
      <div className="flex justify-end w-full mb-4">
        <Select
          aria-label="Time Range"
          className="w-32"
          defaultSelectedKeys={["Week"]}
          listboxProps={{
            itemClasses: {
              title: "text-tiny",
            },
          }}
          placeholder="Week"
          size="sm"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <SelectItem key="Week">Week</SelectItem>
          <SelectItem key="Month">Month</SelectItem>
          <SelectItem key="All Time">All Time</SelectItem>
        </Select>
      </div>
      <ResponsiveContainer height={250} width="100%">
        <RadarChart cx="50%" cy="50%" data={data} outerRadius="70%">
          <PolarGrid stroke="#ddd" />
          <PolarAngleAxis
            dataKey="muscle"
            tick={{ fill: "#555", fontSize: 10 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "#777", fontSize: 10 }}
          />
          <Tooltip />
          <Radar
            dataKey="value"
            fill="#3b82f6"
            fillOpacity={0.6}
            name="Training Frequency"
            stroke="#3b82f6"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
