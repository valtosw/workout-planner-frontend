import { useState } from "react";

const useFeedback = () => {
  const [feedback, setFeedback] = useState<{
    message: string;
    intent: "error" | "success" | "info" | "warning";
  } | null>(null);

  return { feedback, setFeedback };
};

export default useFeedback;
