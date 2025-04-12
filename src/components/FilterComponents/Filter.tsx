import { useState, useEffect } from "react";
import {
  Slider,
  Input,
  Button,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";

import {
  getFilteredTrainers,
  getMaxExperience,
  getMaxTrainingPrice,
} from "@/api/ModelApis/TrainerApi";
import { FilterProps } from "@/types/trainer";
import { errorToast } from "@/types/toast";
import { getCountryList } from "@/api/ModelApis/CountryApi";

const TrainerFilter: React.FC<FilterProps> = ({ onFilter }) => {
  const [experience, setExperience] = useState<number>(0);
  const [country, setCountry] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [isCertified, setIsCertified] = useState<boolean | null>(null);
  const [maxPriceForSlider, setMaxPriceForSlider] = useState(0);
  const [maxExperience, setMaxExperience] = useState(0);
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);

  const onSelectionChange = (key: React.Key | null) => {
    setSelectedKey(key);
  };

  const onInputChange = (value: string) => {
    setCountry(value);
  };

  const handleFilter = async () => {
    try {
      await getFilteredTrainers(
        experience,
        minPrice,
        maxPrice,
        isCertified,
        country,
        city,
      );

      onFilter({
        experience,
        minPrice,
        maxPrice,
        isCertified,
        country,
        city,
      });
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const maxPrice = await getMaxTrainingPrice();

        setMaxPriceForSlider(maxPrice);
      } catch (error: any) {
        errorToast(error.message);
      }
    };

    fetchMaxPrice();
  }, []);

  useEffect(() => {
    const fetchMaxExperience = async () => {
      try {
        const maxExperience = await getMaxExperience();

        setMaxExperience(maxExperience);
      } catch (error: any) {
        errorToast(error.message);
      }
    };

    fetchMaxExperience();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await getCountryList();

        setCountries(countries);
      } catch (error: any) {
        errorToast(error.message);
      }
    };

    fetchCountries();
  }, []);

  const resetFilter = () => {
    setMinPrice(0);
    setMaxPrice(maxPriceForSlider);
    setExperience(0);
    setIsCertified(null);
    setCountry(null);
    setCity(null);
  };

  return (
    <div className="p-4 rounded-lg bg-background w-full max-w-xs">
      <h2 className="text-xl font-semibold mb-4">Filter Trainers</h2>
      <div className="flex flex-col gap-4">
        <Slider
          color={"foreground"}
          formatOptions={{ style: "currency", currency: "USD" }}
          label="Price Range"
          maxValue={maxPriceForSlider}
          minValue={0}
          showTooltip={true}
          step={1}
          tooltipValueFormatOptions={{ style: "currency", currency: "USD" }}
          value={[minPrice, maxPrice]}
          onChange={(val: number | number[]) => {
            if (Array.isArray(val)) {
              setMinPrice(val[0]);
              setMaxPrice(val[1]);
            }
          }}
        />

        <Slider
          color={"foreground"}
          label="Minimum Experience (years)"
          maxValue={maxExperience}
          minValue={0}
          step={1}
          value={experience}
          onChange={(val: number | number[]) => {
            if (typeof val === "number") {
              setExperience(val);
            }
          }}
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

        <Autocomplete
          isVirtualized
          defaultItems={countries.map((country) => ({
            label: country,
            value: country,
          }))}
          label="Select a country"
          placeholder="Select..."
          onInputChange={onInputChange}
          onSelectionChange={onSelectionChange}
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>

        <Input
          label="City"
          placeholder="Enter city"
          value={city!}
          onChange={(e) => setCity(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <Button
            className="w-full bg-black dark:bg-white text-white dark:text-black 
              hover:bg-gray-800 dark:hover:bg-gray-200 
              transition-colors duration-200 
              py-2 px-4 
              border border-transparent dark:border-gray-300
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            onPress={handleFilter}
          >
            Apply
          </Button>
          <Button color="danger" variant="flat" onPress={resetFilter}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainerFilter;
