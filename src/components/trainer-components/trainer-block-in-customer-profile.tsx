import { Image as HeroUIImage, Card, CardFooter, Button } from "@heroui/react";

import { TrainerBlockProps } from "@/types/trainer";

export const TrainerBlockInCustomerProfile: React.FC<TrainerBlockProps> = ({
  trainer,
}) => {
  return (
    <Card isFooterBlurred className="border-none" radius="lg">
      <HeroUIImage
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src={
          trainer.photoUrl ??
          "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
        }
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-sm truncate text-white/80">
          {trainer.firstName} {trainer.lastName}
        </p>
        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          See more
        </Button>
      </CardFooter>
    </Card>
  );
};
