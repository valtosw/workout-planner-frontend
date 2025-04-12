import { useEffect, useState } from "react";
import { format } from "date-fns";

import { Card, CardBody } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/Default";
import axios from "@/api/axios";
import ProgressLogForm from "@/components/ProgressLoggingComponents/LoggingForm";


const ProgressLoggingPage: React.FC = () => {
  const { auth } = useAuth();

  return (
    <DefaultLayout>
      <div className="flex flex-col p-6 w-full h-[calc(100vh-5rem)] overflow-hidden">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-900 dark:text-gray-100 mb-6 text-center">
          Progress Logging
        </h1>
        <div className="w-full max-w-md mx-auto">
          <ProgressLogForm userId={auth?.id || ""} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProgressLoggingPage;
