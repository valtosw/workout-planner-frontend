import { Modal } from "@heroui/react";

import { Trainer } from "@/types/trainer";

interface TrainerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainer: Trainer;
}

// export const TrainerProfileModal = ({
//   isOpen,
//   onClose,
//   trainer,
// }: TrainerProfileModalProps) => {
//   return (
//     <Modal
//       className="bg-white dark:bg-[#18181c]"
//       isOpen={isOpen}
//       size="lg"
//       onClose={onClose}
//     />
//   );
// };
