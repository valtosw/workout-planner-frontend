import { useState, useEffect } from "react";
import { Divider, CircularProgress } from "@heroui/react";

import TrainerBlock from "../components/TrainerComponents/TrainerBlock";
import { Trainer } from "../types/trainer";
import TrainerFilter from "../components/FilterComponents/Filter";
import { errorToast } from "../types/toast";

import {
  getPostedTrainersList,
  getFilteredTrainers,
} from "@/api/ModelApis/TrainerApi";
import DefaultLayout from "@/layouts/Default";

const TrainersPage: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainers = await getPostedTrainersList();

        setTrainers(trainers);
      } catch (error: any) {
        errorToast(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const handleFilter = async (filters: {
    experience: number | null;
    minPrice: number;
    maxPrice: number;
    isCertified: boolean | null;
    country: string | null;
    city: string | null;
    isNear: boolean;
    latitude: number | null;
    longitude: number | null;
  }) => {
    setIsLoading(true);
    try {
      const filteredTrainers = await getFilteredTrainers(
        filters.experience,
        filters.minPrice,
        filters.maxPrice,
        filters.isCertified,
        filters.country,
        filters.city,
      );

      setTrainers(filteredTrainers);
    } catch (error: any) {
      errorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex w-full p-4">
        <div className="w-1/5 sticky top-4 h-screen overflow-y-auto">
          <TrainerFilter onFilter={handleFilter} />
        </div>

        <Divider className="h-screen mx-2" orientation="vertical" />

        <div className="w-4/5">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <CircularProgress color="secondary" label="Loading..." />
            </div>
          )}

          {!isLoading && trainers.length === 0 && (
            <h1 className="text-center text-gray-500 text-2xl">
              No trainers found
            </h1>
          )}

          {!isLoading && trainers.length > 0 && (
            <div
              className="grid gap-6 p-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
            >
              {trainers.map((trainer) => (
                <TrainerBlock
                  key={trainer.firstName + trainer.lastName}
                  trainer={trainer}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TrainersPage;
