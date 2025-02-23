import { useState } from "react";
import {
  Slider,
  Select,
  SelectItem,
  Checkbox,
  Input,
  Button,
} from "@heroui/react";

import { getFilteredTrainers } from "@/api/trainerApi";
import { FilterProps } from "@/types/trainer";

const TrainerFilter: React.FC<FilterProps> = ({ onFilter }) => {
  const [experience, setExperience] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [isCertified, setIsCertified] = useState<boolean | null>(null);
  const [location, setLocation] = useState<string>("");

  const handleFilter = async () => {
    try {
      await getFilteredTrainers(
        experience,
        minPrice,
        maxPrice,
        isCertified,
        location,
      );

      onFilter({
        experience,
        minPrice,
        maxPrice,
        isCertified,
        location,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Filter Trainers</h2>
      <Slider
        label="Price Range"
        maxValue={300}
        minValue={0}
        step={1}
        value={[minPrice, maxPrice]}
        onChange={(val: number | number[]) => {
          if (Array.isArray(val)) {
            setMinPrice(val[0]);
            setMaxPrice(val[1]);
          }
        }}
      />
      <Select
        label="Experience"
        onChange={(e) => setExperience(e.target.value)}
      >
        {["1+", "3+", "5+", "10+"].map((exp) => (
          <SelectItem key={exp}>{exp} years</SelectItem>
        ))}
      </Select>
      <Checkbox
        isSelected={isCertified ?? false}
        onChange={(e) => setIsCertified(e.target.checked)}
      >
        Certified Trainers
      </Checkbox>
      <Input
        label="Location"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Button color="primary" onClick={handleFilter}>
        Apply Filters
      </Button>
    </div>
  );
};

export default TrainerFilter;
