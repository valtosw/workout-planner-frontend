import { useState, useEffect } from "react";

import { axiosPrivate } from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { errorToast } from "@/types/toast";
import CustomerProfilePage from "@/components/ProfileComponents/CustomerProfile";
import TrainerProfilePage from "@/components/ProfileComponents/TrainerProfile";

export default function ProfilePage() {
  const { auth } = useAuth();
  const [isTrainer, setIsTrainer] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth?.id) {
        try {
          const response = await axiosPrivate.get(
            `/ApplicationUser/Role/${auth.id}`,
          );

          setIsTrainer(response.data === "Trainer");
        } catch (error: any) {
          errorToast(error.message);
        }
      }
    };

    fetchUserRole();
  }, [auth?.id]);

  return isTrainer ? <TrainerProfilePage /> : <CustomerProfilePage />;
}
