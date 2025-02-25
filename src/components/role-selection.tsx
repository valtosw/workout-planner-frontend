import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "@heroui/use-theme";
import { Card } from "@heroui/react";

import { DumbbellIcon } from "@/components/icons";

export const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState("customer");
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
        Select Your Role
      </p>
      <div className="flex gap-4">
        {/* Customer Role */}
        <Card
          isPressable
          className={`w-1/2 p-3 rounded-xl border transition-all ${
            selectedRole === "customer"
              ? isDarkMode
                ? "border-[var(--color-customer-dark-border)] bg-[var(--color-customer-dark-bg)] shadow-md"
                : "border-[var(--color-customer-light-border)] bg-[var(--color-customer-light-bg)] shadow-md"
              : isDarkMode
                ? "border-[var(--color-default-dark-border)] bg-[var(--color-default-dark-bg)] hover:bg-[var(--color-default-dark-hover)]"
                : "border-[var(--color-default-light-border)] bg-[var(--color-default-light-bg)] hover:bg-[var(--color-default-light-hover)]"
          }`}
          onPress={() => setSelectedRole("customer")}
        >
          <div className="flex flex-col items-center gap-1">
            <Icon
              className={`text-2xl ${
                selectedRole === "customer"
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              icon="ph:user"
            />
            <p
              className={`text-sm font-semibold ${
                selectedRole === "customer"
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Customer
            </p>
          </div>
        </Card>

        {/* Trainer Role */}
        <Card
          isPressable
          className={`w-1/2 p-3 rounded-xl border transition-all ${
            selectedRole === "trainer"
              ? isDarkMode
                ? "border-[var(--color-trainer-dark-border)] bg-[var(--color-trainer-dark-bg)] shadow-md"
                : "border-[var(--color-trainer-light-border)] bg-[var(--color-trainer-light-bg)] shadow-md"
              : isDarkMode
                ? "border-[var(--color-default-dark-border)] bg-[var(--color-default-dark-bg)] hover:bg-[var(--color-default-dark-hover)]"
                : "border-[var(--color-default-light-border)] bg-[var(--color-default-light-bg)] hover:bg-[var(--color-default-light-hover)]"
          }`}
          onPress={() => setSelectedRole("trainer")}
        >
          <div className="flex flex-col items-center gap-1">
            <DumbbellIcon
              className={`text-2xl ${
                selectedRole === "trainer"
                  ? "text-green-500 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
            <p
              className={`text-sm font-semibold ${
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
