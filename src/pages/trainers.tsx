import { useState, useEffect } from "react";
import { Divider } from "@heroui/react";

import TrainerBlock from "../components/trainer-block";
import { Trainer } from "../types/trainer";
import TrainerFilter from "../components/filter";

import { getPostedTrainersList } from "@/api/trainerApi";
import { getFilteredTrainers } from "@/api/trainerApi";
import DefaultLayout from "@/layouts/default";

const TrainersPage: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainers = await getPostedTrainersList();

        setTrainers(trainers);
      } catch (error) {
        alert(error);
      }
    };

    fetchTrainers();
  }, []);

  const handleFilter = async (filters: {
    experience: number | null;
    minPrice: number;
    maxPrice: number;
    isCertified: boolean | null;
    location: string;
  }) => {
    try {
      const filteredTrainers = await getFilteredTrainers(
        filters.experience,
        filters.minPrice,
        filters.maxPrice,
        filters.isCertified,
        filters.location,
      );

      setTrainers(filteredTrainers);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="w-full">
        <div className="sticky top-4">
          <TrainerFilter onFilter={handleFilter} />
        </div>
      </div>

      <Divider />

      <div className="w-full mx-auto p-4">
        <div className="flex-1">
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
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TrainersPage;
