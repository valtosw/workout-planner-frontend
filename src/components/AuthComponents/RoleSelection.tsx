import { Icon } from "@iconify/react";
import { Card } from "@heroui/react";

import { DumbbellIcon } from "@/components/icons";

export const RoleSelection = ({
  selectedRole,
  onRoleChange,
}: {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
        Select Your Role
      </p>
      <div className="flex gap-4">
        <Card
          isPressable
          className={`w-1/2 p-3 rounded-xl border transition-all bg-background 
            ${
              selectedRole === "customer"
                ? "border-2 border-blue-500 dark:border-blue-400 shadow-md scale-105"
                : "border-gray-300 dark:border-gray-700"
            }`}
          onPress={() => onRoleChange("customer")}
        >
          <div className="flex flex-col items-center gap-1">
            <Icon
              className={`text-2xl transition-all ${
                selectedRole === "customer"
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              icon="ph:user"
            />
            <p
              className={`text-sm font-semibold transition-all ${
                selectedRole === "customer"
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Customer
            </p>
          </div>
        </Card>

        <Card
          isPressable
          className={`w-1/2 p-3 rounded-xl border transition-all bg-background 
            ${
              selectedRole === "trainer"
                ? "border-2 border-green-500 dark:border-green-400 shadow-md scale-105"
                : "border-gray-300 dark:border-gray-700"
            }`}
          onPress={() => onRoleChange("trainer")}
        >
          <div className="flex flex-col items-center gap-1">
            <DumbbellIcon
              className={`text-2xl transition-all ${
                selectedRole === "trainer"
                  ? "text-green-500 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
            <p
              className={`text-sm font-semibold transition-all ${
                selectedRole === "trainer"
                  ? "text-green-500 dark:text-green-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Trainer
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
