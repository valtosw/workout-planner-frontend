import { Card, CardBody, Button } from "@heroui/react";
import { motion } from "framer-motion";

import { ThemeSwitch } from "@/components/theme-switch";

interface StatusPageTemplateProps {
  status?: string;
  title?: string;
  description?: string;
  action?: string;
  onActionClick?: () => void;
}

export function StatusPageTemplate({
  status,
  title,
  description,
  action,
  onActionClick,
}: StatusPageTemplateProps) {
  return (
    <>
      <div className="flex items-center justify-center h-screen p-6">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -10 }}
        >
          <Card className="text-center p-8 w-96 shadow-lg">
            <CardBody>
              <h1 className="text-5xl font-bold mb-2">{status}</h1>
              <h2 className="text-2xl font-semibold mb-4">{title}</h2>
              <p className="text-gray-500 mb-6">{description}</p>
              {action && (
                <Button color="primary" onPress={onActionClick}>
                  {action}
                </Button>
              )}
            </CardBody>
          </Card>
        </motion.div>
      </div>
      <ThemeSwitch />
    </>
  );
}
