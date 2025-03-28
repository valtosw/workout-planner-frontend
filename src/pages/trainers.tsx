import { useState, useEffect } from "react";
import { Divider, CircularProgress, Button } from "@heroui/react";

import { Trainer } from "../types/trainer";
import TrainerFilter from "../components/FilterComponents/Filter";
import { errorToast } from "../types/toast";

import {
  getPostedTrainersList,
  getFilteredTrainers,
} from "@/api/ModelApis/TrainerApi";
import DefaultLayout from "@/layouts/Default";
import TrainerListItem from "@/components/TrainerComponents/TrainerListItem";

const TrainersPage: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

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
      setVisibleCount(5);
    } catch (error: any) {
      errorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 50);
  };

  return (
    <DefaultLayout>
      <div className="flex w-full h-[calc(100vh-80px)] overflow-hidden">
        <div className="w-1/5 p-4 overflow-hidden">
          <TrainerFilter onFilter={handleFilter} />
        </div>
        <Divider className="h-full mx-2" orientation="vertical" />
        <div className="flex-1 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <CircularProgress />
              </div>
            ) : trainers.length > 0 ? (
              <div>
                {trainers.slice(0, visibleCount).map((trainer) => (
                  <TrainerListItem
                    key={`${trainer.firstName}-${trainer.lastName}`}
                    trainer={trainer}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                No trainers found matching your criteria.
              </div>
            )}
          </div>

          {trainers.length > visibleCount && (
            <div className="p-4 flex justify-center">
              <Button
                className="px-4 py-2 transition-colors"
                color="default"
                variant="flat"
                onPress={loadMore}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TrainersPage;