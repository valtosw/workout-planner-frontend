import { useState, useEffect } from "react";
import {
  Slider,
  Input,
  Button,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";

import { getFilteredTrainers, getMaxTrainingPrice } from "@/api/trainerApi";
import { FilterProps } from "@/types/trainer";

const TrainerFilter: React.FC<FilterProps> = ({ onFilter }) => {
  const [experience, setExperience] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [isCertified, setIsCertified] = useState<boolean | null>(null);
  const [location, setLocation] = useState<string>("");
  const [maxPriceForSlider, setMaxPriceForSlider] = useState(0);

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

  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const maxPrice = await getMaxTrainingPrice();

        setMaxPriceForSlider(maxPrice);
      } catch (error) {
        alert(error);
      }
    };

    fetchMaxPrice();
  }, []);

  const resetFilter = () => {
    setMinPrice(0);
    setMaxPrice(maxPriceForSlider);
    setExperience(0);
    setIsCertified(null);
    setLocation("");
  };

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Filter Trainers</h2>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <Slider
          color="secondary"
          formatOptions={{ style: "currency", currency: "USD" }}
          label="Price Range"
          maxValue={maxPriceForSlider}
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
        <NumberInput
          label="Experience"
          maxValue={70}
          minValue={0}
          placeholder="Minimum number of years"
          onValueChange={setExperience}
        />
        <Select
          label="Trainer Certification"
          selectedKeys={[
            isCertified === true
              ? "true"
              : isCertified === false
                ? "false"
                : "null",
          ]}
          onChange={(e) =>
            setIsCertified(
              e.target.value === "true"
                ? true
                : e.target.value === "false"
                  ? false
                  : null,
            )
          }
        >
          <SelectItem key="null">All</SelectItem>
          <SelectItem key="true">Certified</SelectItem>
          <SelectItem key="false">Not Certified</SelectItem>
        </Select>
        <Input
          label="Location"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="flex flex-col md:flex-row gap-2 md:w-auto">
          <Button
            className="w-full md:w-auto"
            color="secondary"
            onPress={handleFilter}
          >
            Apply
          </Button>
          <Button
            className="w-full md:w-auto"
            color="danger"
            onPress={resetFilter}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainerFilter;
