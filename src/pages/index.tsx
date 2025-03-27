import { Link as RouterLink } from "react-router-dom";
import { Button } from "@heroui/react";

import DefaultLayout from "@/layouts/Default";
import { ROUTES } from "@/constants/Routes";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div
        className="fixed inset-0 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://www.pixelstalk.net/wp-content/uploads/images1/Conquer-Motivation-Backgrounds.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div className="relative h-full w-full flex items-center px-4 sm:px-10 md:px-20">
          <div className="text-white max-w-lg">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Take Your Fitness to the Next Level
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300">
              Create personalized workout plans and connect with experienced
              trainers to achieve your goals faster.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                as={RouterLink}
                className="rounded-full text-black dark:hover:text-black dark:text-white border-white hover:bg-white hover:text-black"
                size="lg"
                to={ROUTES.WORKOUT_PLANS}
                variant="shadow"
              >
                Create Workout Plan
              </Button>
              <Button
                as={RouterLink}
                className="rounded-full text-white border-white hover:bg-white hover:text-black"
                size="lg"
                to={ROUTES.TRAINERS}
                variant="bordered"
              >
                Find Trainer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
