import { useState, useEffect } from "react";

import TrainerBlock from "../components/trainer-block";
import { Trainer } from "../components/trainer-block";
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

  // const handleFilter = async (filters: {
  //   experience: string | null;
  //   minPrice: number;
  //   maxPrice: number;
  //   isCertified: boolean | null;
  //   location: string;
  // }) => {
  //   try {
  //     const filteredTrainers = await getFilteredTrainers(
  //       filters.experience,
  //       filters.minPrice,
  //       filters.maxPrice,
  //       filters.isCertified,
  //       filters.location,
  //     );

  //     setTrainers(filteredTrainers);
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {trainers.map((trainer) => (
              <TrainerBlock
                key={trainer.firstName + trainer.lastName}
                trainer={trainer}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <div className="w-64 ml-6">
        <div className="sticky top-4">
          <TrainerFilter onFilter={handleFilter} />
        </div>
      </div> */}
    </DefaultLayout>
  );
};

export default TrainersPage;
